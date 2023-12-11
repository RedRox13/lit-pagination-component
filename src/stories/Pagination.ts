import { LitElement, TemplateResult, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {styles} from "./Pagination.css"
import { EButtonType } from './utils/button-type.enum';
import { IButton } from './utils/button.interface';
import { Button } from './utils/button.model';
import { classMap } from 'lit/directives/class-map.js';

@customElement('wc-pagination')
export class WcPagination extends LitElement {
  /**
   * @ignore
   */
  static override styles = [styles];

  // General
  @property({ type: Number }) totalPages = 10;
  @property({ type: Number }) currentPage = 1;
  @property({ type: EButtonType }) buttonType = EButtonType.Default;
  @property({ type: Boolean }) isOpen = false;
  // Navigation
  @property({ type: Boolean }) isNavDisabled = false;
  @property({ type: Boolean }) isFirstLastButtonsShown = true;
  @property({ type: [] }) firstLastButtonLabeles = ['First', 'Last'];
  @property({ type: Boolean }) isPrevNextButtonsShown = true;
  @property({ type: [] }) prevNextButtonLabeles = ['Prev', 'Next'];
  // Icons
  @property({ type: String }) fistButtonIcon!: string;
  @property({ type: String }) prevButtonIcon!: string;
  @property({ type: String }) nextButtonIcon!: string;
  @property({ type: String }) lastButtonIcon!: string;
  @property({ type: String }) dropdownIcon!: string;

  override render(): TemplateResult {
    return html`
      <ul class="pagination">
        ${this.renderPaginationItems()}
      </ul>
      <div class="page-selection">
        Page ${this.renderPageSelection()} of ${this.totalPages}
      </div>
    `;
  }

  renderPaginationItems(): TemplateResult {
    const pagesList: IButton[] = [];
    const endPages: number = this.totalPages > 2 ? this.totalPages : 0;
    const siblingsStart: number = Math.max(
      Math.min(this.currentPage - 1, this.totalPages - 4),
      3
    );
    const siblingsEnd: number = Math.min(
      Math.max(this.currentPage + 1, 5),
      endPages > 0 ? endPages - 2 : this.totalPages - 1
    );

    // 'First' button
    if (this.isFirstLastButtonsShown) {
      pagesList.push(
        new Button(
          -1,
          () => this.handleChangePage(1),
          this.isNavDisabled,
          this.firstLastButtonLabeles[0],
          this.fistButtonIcon
        )
      );
    }

    // 'Prev' button
    if (this.isPrevNextButtonsShown) {
      pagesList.push(
        new Button(
          this.currentPage - 1,
          () => this.handleChangePage(this.currentPage - 1),
          this.isNavDisabled,
          this.prevNextButtonLabeles[0],
          this.prevButtonIcon
        )
      );
    }

    // First page
    pagesList.push(
      new Button(1, () => this.handleChangePage(1))
    );

    // Left siblings or ellipsis
    if (siblingsStart > 3) {
      pagesList.push(
        new Button(-1, () => { }, false, '...')
      );
    } else if (this.totalPages - 1 > 2) {
      pagesList.push(
        new Button(2, () => this.handleChangePage(2))
      );
    }

    // Central part
    for (let i = siblingsStart; i <= siblingsEnd; i++) {
      pagesList.push(new Button(i, () => this.handleChangePage(i)));
    }

    // Right siblings or ellipsis
    if (this.totalPages - 2 > siblingsEnd) {
      pagesList.push(
        new Button(-1, () => { }, false, '...')
      )
    } else if (this.totalPages - 1 > 1) {
      pagesList.push(
        new Button(this.totalPages - 1, () => this.handleChangePage(this.totalPages - 1))
      );
    }

    // Last page
    if (this.totalPages > 1) {
      pagesList.push(
        new Button(this.totalPages, () => this.handleChangePage(this.totalPages))
      );
    }

    // 'Next' button
    if (this.isPrevNextButtonsShown) {
      pagesList.push(
        new Button(
          this.currentPage + 1,
          () => this.handleChangePage(this.currentPage + 1),
          this.isNavDisabled,
          this.prevNextButtonLabeles[1],
          this.nextButtonIcon
        )
      );
    }

    // 'Last' button
    if (this.isFirstLastButtonsShown) {
      pagesList.push(
        new Button(
          -1,
          () => this.handleChangePage(this.totalPages),
          this.isNavDisabled,
          this.firstLastButtonLabeles[1],
          this.lastButtonIcon
        )
      );
    }

    return html`
      ${pagesList.map((page: IButton) => {
        const classes: Record<string, boolean> = {
          'pagination-item': true,
          'active': page.index === this.currentPage,
          'circle': this.buttonType === EButtonType.Circle,
          'disabled': page.isDisabled,
          'nav-button': page.isNavButton,
          'ellipsis': page.isEllipsis,
          'text-label': page.isTextLabel
        };

        return html`
          <li class=${classMap(classes)}
              @click="${page.isDisabled ? null : () => page.handler(page.index)}"
          >
            ${ page.icon ? html`<object data=${page.icon} class="icon" type="image/svg+xml"></object>` : page.label }
          </li>
        `
      })}
    `;
  }

  renderPageSelection() {
    return html`
      <div class="dropdown" @click=${this.toggleDropdown}>
        <div class="selected-item">
          <div>${this.currentPage}</div>
          ${
            this.dropdownIcon
              ? html`<object data="${this.dropdownIcon}" class="icon" type="image/svg+xml"></object>`
              : null
          }
        </div>
        <div class="dropdown-list-wrapper ${this.isOpen ? 'open' : ''}">
          <div class="dropdown-list">
            ${Array.from({ length: this.totalPages }, (_, index) => index + 1).map(
              (item) => html`
                <div class="dropdown-item" @click=${() => this.handleChangePage(item)}>${item}</div>
              `
            )}
          </div>
        </div>
      </div>
    `;
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  handleChangePage(page: number): void {
    if (page !== this.currentPage && page >= 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.dispatchEvent(
        new CustomEvent('page-changed', {
          detail: { page: page },
          bubbles: true,
          composed: true,
        })
      );
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [name]: WcPagination;
  }
}

const name = 'wc-pagination';

if (!customElements.get(name)) {
  customElements.define(name, WcPagination);
} else {
  console.warn(`${name} is already defined`);
}
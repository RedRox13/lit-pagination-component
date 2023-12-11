import './Pagination';
import {WcPagination} from "./Pagination";
import {html} from "lit";

export default {
  title: 'wc-pagination',
  component: 'wc-pagination',
  argTypes: {
    currentPage: {
      description: 'Selected page',
      type: { name: 'number' },
      control: { type: 'number' },
      table: { defaultValue: { summary: 0 } },
    },
    totalPages: {
      description: 'Total pages',
      type: { name: 'number' },
      control: { type: 'number' },
      table: { defaultValue: { summary: 9 } },
    },
    buttonType: {
      description: 'Buttons type',
      type: { name: 'number' },
      options: [1, 2],
      control: { type: 'select' },
      table: { defaultValue: { summary: 1 } },
    },
    isNavDisabled: {
      description: 'Disable navigation',
      type: { name: 'boolean' },
      control: { type: 'boolean' },
      table: { defaultValue: { summary: false } },
    },
    isFirstLastButtonsShown: {
      description: 'Toggle First and Last buttons',
      type: { name: 'boolean' },
      control: { type: 'boolean' },
      table: { defaultValue: { summary: true } },
    },
    firstLastButtonLabeles: {
      description: 'Provide labels for first and last',
      type: { name: 'array' },
      table: { defaultValue: { summary: ['First', 'Last'] } },
    },
    isPrevNextButtonsShown: {
      description: 'Toggle Prev and Next buttons',
      type: { name: 'boolean' },
      control: { type: 'boolean' },
      table: { defaultValue: { summary: true } },
    },
    prevNextButtonLabeles: {
      description: 'Provide labels for prev and next buttons',
      type: { name: 'array' },
      table: { defaultValue: { summary: ['Prev', 'Next'] } },
    },
    fistButtonIcon: {
      description: 'Icon for "first" button',
      type: { name: 'string' },
      options: ['', './First.svg'],
      control: { type: 'select' },
      table: { defaultValue: { summary: null } },
    },
    prevButtonIcon: {
      description: 'Icon for "prev" button',
      type: { name: 'string' },
      options: ['', './Prev.svg'],
      control: { type: 'select' },
      table: { defaultValue: { summary: null } },
    },
    nextButtonIcon: {
      description: 'Icon for "next" button',
      type: { name: 'string' },
      options: ['', './Next.svg'],
      control: { type: 'select' },
      table: { defaultValue: { summary: null } },
    },
    lastButtonIcon: {
      description: 'Icon for "last" button',
      type: { name: 'string' },
      options: ['', './Last.svg'],
      control: { type: 'select' },
      table: { defaultValue: { summary: null } },
    }
  }
};

export const Interactive = (args: WcPagination) => html`
  <div style="height:400px"></div>
  <wc-pagination .currentPage="${args.currentPage}"
                 .totalPages="${args.totalPages}"
                 .buttonType="${args.buttonType}"
                 .isNavDisabled="${args.isNavDisabled}"
                 .isFirstLastButtonsShown="${args.isFirstLastButtonsShown}"
                 .firstLastButtonLabeles="${args.firstLastButtonLabeles}"
                 .isPrevNextButtonsShown="${args.isPrevNextButtonsShown}"
                 .prevNextButtonLabeles="${args.prevNextButtonLabeles}"
                 fistButtonIcon="${args.fistButtonIcon}"
                 prevButtonIcon="${args.prevButtonIcon}"
                 nextButtonIcon="${args.nextButtonIcon}"
                 lastButtonIcon="${args.lastButtonIcon}"
                 dropdownIcon="${args.dropdownIcon}"
  ></wc-pagination>
`;

Interactive['args'] = {
  currentPage: 0,
  totalPages: 9,
  buttonType: 1,
  isNavDisabled: false,
  isFirstLastButtonsShown: true,
  firstLastButtonLabeles: ['First', 'Last'],
  isPrevNextButtonsShown: true,
  prevNextButtonLabeles: ['Prev', 'Next'],
  fistButtonIcon: './First.svg',
  prevButtonIcon: './Prev.svg',
  nextButtonIcon: './Next.svg',
  lastButtonIcon: './Last.svg',
  dropdownIcon: './ChevronDown.svg'
}
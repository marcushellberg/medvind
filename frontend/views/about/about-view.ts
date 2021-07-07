import { customElement, html } from 'lit-element';
import { View } from '../../views/view';
import '@vaadin/vaadin-button';

@customElement('about-view')
export class AboutView extends View {
  render() {
    return html`
      <div class="flex h-96 gap-2 p-3 w-full justify-between">
        <div class="text-l">Hello</div>
        <div class="text-xl self-center">Hello</div>
        <div class="text-2xl self-end">Hello</div>
      </div>
    `;
  }
}

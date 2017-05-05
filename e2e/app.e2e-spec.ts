import { NoteAppPage } from './app.po';

describe('note-app App', () => {
  let page: NoteAppPage;

  beforeEach(() => {
    page = new NoteAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

import { JinyufeiliWebPage } from './app.po';

describe('jinyufeili-web App', function() {
  let page: JinyufeiliWebPage;

  beforeEach(() => {
    page = new JinyufeiliWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

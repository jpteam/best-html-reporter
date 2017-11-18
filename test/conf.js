exports.config =
{
  specs: ['login.js'],
  framework: 'jasmine',
  type: "node",
  directConnect: true,
  multiCapabilities:
    [
      {'browserName': 'chrome',chromeOptions: {args: ['--no-sandbox']}, count: 1}
    ],
  onPrepare : function ()
    {
      browser.get('file:///home/nimmi/Desktop/test.html');
    }
};
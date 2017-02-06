Following are the steps:
<ol>
  <li>User enters a url in the browser. Lets say : http://127.0.0.1:53340/ </li>
  <li>Since the url matches the "/", it comes to <code>route.js</code> In <code>route.js</code>, we have defined  <code>$urlRouterProvider.otherwise("/home");</code> </li>
  <li>The url changes to <code>http://127.0.0.1:53422/#!/home</code> </li>
  <li>Since, we have <code>state</code> defined, it picks up appropriate <code>html template</code>.
  <li>We have flexibility to modify the url or define our own controller for this <code>state</code>. This means, when the first time request comes to this url, is there any
  data we need to load before displaying the view? So, we can define a <code>controller</code> too.
  <li>If we want to load the data <sstrong>BEFORE</state> switching the view/state then we have to define a <strong>resolve</strong> property. NOTE: this property needs to be
  <strong>injected</strong> later. This is because you already loaded the data before going to the particular view. So, the loaded data can be injected to controller/service etc.
  <li>Now, we come to the main page. </li>
  <li>Main page >> templates >> components </li>
  <li>Note: <code>&ltui-view&gt &lt/ui-view&gt</code> must be defined in the <code>index.html</code>
</ol>

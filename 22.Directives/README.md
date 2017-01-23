# Angular Directive
Using <strong>Angular Directives</strong> to extend the functionality or behavior. Important point to remember:
<br>
<ol>
    <li>Define a directive by '.directive' in angular module</li>
    <li>Define the directive as a factory function</li>
    <li>Define a <strong>Directive Definition object</strong>, also known as <strong>DDO</strong> inside the factoru function. </li>
    <li>DDO has <strong>template</strong> or <strong>templateUrl</strong> property. </li>
    <li><strong>restrict</strong> property is optional. By default, it includes <strong>Attributes</strong> or <strong>Elements</strong>. </li>
    <li><strong>restrict</strong> property can have values : 
        <ul>
            <li><strong>A</strong> : It restricts only Attributes.</li>
            <li><strong>E</strong> : It includes only Elements.</li>
            <li><strong>AE</strong> : It includes either Attribute or Element</li>
        </ul>
    </li>
</ol>
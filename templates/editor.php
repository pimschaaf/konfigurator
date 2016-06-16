<div data-bind="with:pageModels.editor">
    <h1>Editor</h1>

    <p><label for="firstName">First name:</label><input id="firstName" data-bind="value: firstName" /></p>
    <p><label for="lastName">Last name:</label><input id="lastName" data-bind="value: lastName" /></p>
    <h2>Hello, <span data-bind="text: fullName"> </span>!</h2>

    <a class="page-link" href="initializing">Go back</a>
</div>
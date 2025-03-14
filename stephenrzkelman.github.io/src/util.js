export function allPages() {
    let importPage = require.context('./pages/', false, /^\.\/[A-Z][a-z]*$/);
    return importPage.keys().map(
        pageModuleName => {
            const pageModule = importPage(pageModuleName);
            for (const pageComponentName in pageModule) {
                // each page module should only export the page component
                return [pageModuleName, pageModule[pageComponentName]];
            }
        }
    )
}
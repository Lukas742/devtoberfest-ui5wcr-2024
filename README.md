# Devtoberfest 2024 - UI5 Web Components for React Demo App

This repository includes the codemod demo shown in the 2024 Devtoberfest session, [What's New in UI5 Web Components 2.0 and UI5 Web Components for React 2.0](https://www.youtube.com/watch?v=lvpN3eK39h8).

## Setup

The repository has two branches:

- `main`: The pre-migration branch, which uses `@ui5/webcomponents-react@~1.29.11` & `@ui5/webcomponents@~1.24.11`.
- `migration`: The post-migration branch, as shown in the Devtoberfest session, using `@ui5/webcomponents-react@2.3.0` & `@ui5/webcomponents@2.2.0`.

Install dependencies:

```sh
npm i
```

Start the development server:

```sh
npm run dev
```

## Resources

- [2024 Devtoberfest session](https://www.youtube.com/watch?v=lvpN3eK39h8)
- [2023 UI5WCR Devtoberfest session](https://www.youtube.com/watch?v=zyOxgjoSnGw)
- [UI5 Web Components for React repository](https://github.com/SAP/ui5-webcomponents-react)
- [UI5WCR Migration Guide & documentation](https://sap.github.io/ui5-webcomponents-react/v2/?path=/docs/migration-guide--docs)
- [UI5 Web Components repository](https://github.com/SAP/ui5-webcomponents)
- [UI5WC Migration Guide & documentation](https://sap.github.io/ui5-webcomponents/docs/migration-guides/to-version-2/)
- [Common CSS documentation](https://sap.github.io/fundamental-styles/?path=/docs/common-css-introduction--docs)

Codemod ([link](https://sap.github.io/ui5-webcomponents-react/v2/?path=/docs/migration-guide--docs#codemod)):
```sh
npx @ui5/webcomponents-react-cli codemod --transform v2 \
    --src ./path/to/src \
    --typescript # only if you use TypeScript in your project, omit if you use JavaScript
```

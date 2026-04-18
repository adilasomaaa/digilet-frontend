export default function (plop) {
  plop.setGenerator('ui', {
    description: 'Generate Frontend Resource (Model, Schema, Service, Page, Hook)',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Nama resource (kebab-case, misal: study-program):',
      },
    ],
    actions: [
      // 1. Model
      {
        type: 'add',
        path: 'src/models/{{snakeCase name}}.ts',
        templateFile: 'stubs/model.hbs',
        skipIfExists: true
      },
      // 2. Schema
      {
        type: 'add',
        path: 'src/schemas/{{pascalCase name}}Schema.ts',
        template: `import { z } from "zod";\n\nexport const {{camelCase name}}Schema = z.object({\n  name: z.string(),\n});\n\nexport type {{pascalCase name}}Schema = z.infer<typeof {{camelCase name}}Schema>;`,
      },
      // 3. Service
      {
        type: 'add',
        path: 'src/services/{{pascalCase name}}Service.ts',
        templateFile: 'stubs/service.hbs',
      },
      // 4. Hook
      {
        type: 'add',
        path: 'src/hooks/use{{pascalCase name}}.ts',
        templateFile: 'stubs/hook.hbs',
      },
      // 5. Page (Folder)
      {
        type: 'add',
        path: 'src/pages/dashboard/{{kebabCase name}}/{{pascalCase name}}Page.tsx',
        templateFile: 'stubs/page.hbs',
      },
      // 6. Config (Inside Page Folder)
      {
        type: 'add',
        path: 'src/pages/dashboard/{{kebabCase name}}/config.tsx',
        templateFile: 'stubs/config.hbs',
      },
    ],
  });
};
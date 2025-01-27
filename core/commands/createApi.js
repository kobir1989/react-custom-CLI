import { ensureDirectoryExists, writeFile, joinPaths, getProjectRoot } from '../utils/fileUtils.js';

export const createApiService = ({ serviceName, httpClient, baseURL }) => {
  const serviceDir = joinPaths(getProjectRoot(), 'src', 'services');
  ensureDirectoryExists(serviceDir);

  let serviceContent = '';

  if (httpClient === 'axios') {
    serviceContent = `import axios from 'axios';\n\n`;
    serviceContent += `// Create axios instance\n`;
    serviceContent += `const api = axios.create({\n`;
    serviceContent += `  baseURL: '${baseURL}',\n`;
    serviceContent += `  headers: {\n`;
    serviceContent += `    'Content-Type': 'application/json',\n`;
    serviceContent += `  },\n`;
    serviceContent += `});\n\n`;

    serviceContent += `// Request interceptor\n`;
    serviceContent += `api.interceptors.request.use(\n`;
    serviceContent += `  (config) => {\n`;
    serviceContent += `    const token = localStorage.getItem('token');\n`;
    serviceContent += `    if (token) {\n`;
    serviceContent += `      config.headers.Authorization = \`Bearer \${token}\`;\n`;
    serviceContent += `    }\n`;
    serviceContent += `    return config;\n`;
    serviceContent += `  },\n`;
    serviceContent += `  (error) => Promise.reject(error)\n`;
    serviceContent += `);\n\n`;
  } else {
    serviceContent = `const BASE_URL = '${baseURL}';\n\n`;
    serviceContent += `const getHeaders = () => {\n`;
    serviceContent += `  const headers = {\n`;
    serviceContent += `    'Content-Type': 'application/json',\n`;
    serviceContent += `  };\n\n`;
    serviceContent += `  const token = localStorage.getItem('token');\n`;
    serviceContent += `  if (token) {\n`;
    serviceContent += `    headers.Authorization = \`Bearer \${token}\`;\n`;
    serviceContent += `  }\n\n`;
    serviceContent += `  return headers;\n`;
    serviceContent += `};\n\n`;
  }

  // Add API methods
  serviceContent += `export const ${serviceName}Service = {\n`;

  if (httpClient === 'axios') {
    serviceContent += generateAxiosMethods(serviceName);
  } else {
    serviceContent += generateFetchMethods(serviceName);
  }

  serviceContent += `};\n`;

  const servicePath = joinPaths(serviceDir, `${serviceName}Service.ts`);
  writeFile(servicePath, serviceContent);

  console.log('\n✅ API service created successfully!');
  console.log('📂 Location:', serviceDir);
  console.log('📦 Generated files:');
  console.log(`   • ${serviceName}Service.ts`);
};

const generateAxiosMethods = (serviceName) => `
  getAll: async () => {
    const response = await api.get('/${serviceName.toLowerCase()}');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(\`/${serviceName.toLowerCase()}/\${id}\`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post('/${serviceName.toLowerCase()}', data);
    return response.data;
  },

  update: async (id: string, data: any) => {
    const response = await api.put(\`/${serviceName.toLowerCase()}/\${id}\`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(\`/${serviceName.toLowerCase()}/\${id}\`);
    return response.data;
  },`;

const generateFetchMethods = (serviceName) => `
  getAll: async () => {
    const response = await fetch(\`\${BASE_URL}/${serviceName.toLowerCase()}\`, {
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },

  getById: async (id: string) => {
    const response = await fetch(\`\${BASE_URL}/${serviceName.toLowerCase()}/\${id}\`, {
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },

  create: async (data: any) => {
    const response = await fetch(\`\${BASE_URL}/${serviceName.toLowerCase()}\`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },

  update: async (id: string, data: any) => {
    const response = await fetch(\`\${BASE_URL}/${serviceName.toLowerCase()}/\${id}\`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },

  delete: async (id: string) => {
    const response = await fetch(\`\${BASE_URL}/${serviceName.toLowerCase()}/\${id}\`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },`;

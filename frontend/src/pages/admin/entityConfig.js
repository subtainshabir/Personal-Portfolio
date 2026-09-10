export const entities = [
  {
    key: 'projects',
    label: 'Projects',
    endpoint: '/projects',
    columns: ['title', 'description'],
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'image', label: 'Image URL', type: 'image' },
    ],
  },
  {
    key: 'skills',
    label: 'Skills',
    endpoint: '/skills',
    columns: ['category', 'name'],
    fields: [
      { name: 'category', label: 'Category', type: 'text', required: true },
      { name: 'name', label: 'Name', type: 'text', required: true },
    ],
  },
  {
    key: 'experience',
    label: 'Experience',
    endpoint: '/experience',
    columns: ['role', 'org', 'start', 'end'],
    fields: [
      { name: 'role', label: 'Role', type: 'text', required: true },
      { name: 'org', label: 'Organization', type: 'text', required: true },
      { name: 'start', label: 'Start', type: 'text', required: true },
      { name: 'end', label: 'End', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'tech', label: 'Tech (comma-separated)', type: 'text' },
    ],
  },
  {
    key: 'education',
    label: 'Education',
    endpoint: '/education',
    columns: ['degree', 'school', 'start', 'end'],
    fields: [
      { name: 'degree', label: 'Degree', type: 'text', required: true },
      { name: 'school', label: 'School', type: 'text', required: true },
      { name: 'start', label: 'Start', type: 'text', required: true },
      { name: 'end', label: 'End', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'tech', label: 'Tech (comma-separated)', type: 'text' },
    ],
  },
  {
    key: 'certifications',
    label: 'Certifications',
    endpoint: '/certifications',
    columns: ['name', 'issuer', 'date'],
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'issuer', label: 'Issuer', type: 'text', required: true },
      { name: 'date', label: 'Date', type: 'text', required: true },
      { name: 'url', label: 'Credential URL', type: 'text' },
    ],
  },
  {
    key: 'services',
    label: 'Services',
    endpoint: '/services',
    columns: ['title', 'description'],
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
    ],
  },
  {
    key: 'social-links',
    label: 'Social Links',
    endpoint: '/social-links',
    columns: ['platform', 'url'],
    fields: [
      { name: 'platform', label: 'Platform', type: 'text', required: true },
      { name: 'url', label: 'URL', type: 'text', required: true },
    ],
  },
  {
    key: 'about',
    label: 'About',
    endpoint: '/about',
    columns: ['name', 'title', 'tagline'],
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'tagline', label: 'Tagline', type: 'text', required: true },
      { name: 'location', label: 'Location', type: 'text' },
      { name: 'bio', label: 'Bio', type: 'textarea', required: true },
      { name: 'resume_url', label: 'Resume URL', type: 'text' },
      { name: 'image', label: 'Profile Image URL', type: 'image' },
    ],
  },
  {
    key: 'highlights',
    label: 'Highlights',
    endpoint: '/highlights',
    columns: ['value', 'label'],
    fields: [
      { name: 'value', label: 'Value', type: 'text', required: true },
      { name: 'label', label: 'Label', type: 'text', required: true },
    ],
  },
  {
    key: 'contact',
    label: 'Contact Messages',
    endpoint: '/contact',
    columns: ['name', 'email', 'message'],
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'text', required: true },
      { name: 'message', label: 'Message', type: 'textarea', required: true },
    ],
    readOnly: true,
  },
];

export function getEntity(key) {
  return entities.find((entity) => entity.key === key);
}
import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
} from '../assets'

const DEV = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

export const skills = [
  { name: 'React',           icon: reactjs },
  { name: 'JavaScript',      icon: javascript },
  { name: 'HTML',            icon: html },
  { name: 'CSS',             icon: css },
  { name: 'Tailwind CSS',    icon: tailwind },
  { name: 'Git',             icon: git },
  { name: 'Docker',          icon: docker },
  { name: 'Python',          icon: `${DEV}/python/python-original.svg` },
  { name: 'C++',             icon: `${DEV}/cplusplus/cplusplus-original.svg` },
  { name: 'Django',          icon: `${DEV}/django/django-plain.svg` },
  { name: 'DRF',             icon: `${DEV}/djangorest/djangorest-original.svg` },
  { name: 'PyTorch',         icon: `${DEV}/pytorch/pytorch-original.svg` },
  { name: 'Linux',           icon: `${DEV}/linux/linux-original.svg` },
  { name: 'System Design',   icon: `${DEV}/networkx/networkx-original.svg` },
  { name: 'API',             icon: `${DEV}/fastapi/fastapi-original.svg` },
  { name: 'AI Engineer',     icon: `${DEV}/tensorflow/tensorflow-original.svg` },
]

export const navLinks = [
  { id: 'home',     title: 'Home' },
  { id: 'about',    title: 'About' },
  { id: 'projects', title: 'Projects' },
  { id: 'contact',  title: 'Contact' },
]

export const services = [
  { title: 'React Developer',  icon: reactjs },
  { title: 'Django Developer', icon: `${DEV}/django/django-plain.svg` },
  { title: 'PyTorch / AI',     icon: `${DEV}/pytorch/pytorch-original.svg` },
  { title: 'Backend Developer', icon: backend },
]

export const technologies = [
  { name: 'HTML 5',        icon: html },
  { name: 'CSS 3',         icon: css },
  { name: 'JavaScript',    icon: javascript },
  { name: 'TypeScript',    icon: typescript },
  { name: 'React JS',      icon: reactjs },
  { name: 'Redux Toolkit', icon: redux },
  { name: 'Tailwind CSS',  icon: tailwind },
  { name: 'Node JS',       icon: nodejs },
  { name: 'MongoDB',       icon: mongodb },
  { name: 'Three JS',      icon: threejs },
  { name: 'git',           icon: git },
  { name: 'Figma',         icon: figma },
  { name: 'Docker',        icon: docker },
]

export const experiences = [
  {
    title: 'React.js Developer',
    company_name: 'Starbucks',
    icon: starbucks,
    iconBg: '#383E56',
    date: 'March 2020 - April 2021',
    points: [
      'Developing and maintaining web applications using React.js and other related technologies.',
      'Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.',
      'Implementing responsive design and ensuring cross-browser compatibility.',
      'Participating in code reviews and providing constructive feedback to other developers.',
    ],
  },
  {
    title: 'React Native Developer',
    company_name: 'Tesla',
    icon: tesla,
    iconBg: '#E6DEDD',
    date: 'Jan 2021 - Feb 2022',
    points: [
      'Developing and maintaining web applications using React.js and other related technologies.',
      'Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.',
      'Implementing responsive design and ensuring cross-browser compatibility.',
      'Participating in code reviews and providing constructive feedback to other developers.',
    ],
  },
  {
    title: 'Web Developer',
    company_name: 'Shopify',
    icon: shopify,
    iconBg: '#383E56',
    date: 'Jan 2022 - Jan 2023',
    points: [
      'Developing and maintaining web applications using React.js and other related technologies.',
      'Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.',
      'Implementing responsive design and ensuring cross-browser compatibility.',
      'Participating in code reviews and providing constructive feedback to other developers.',
    ],
  },
  {
    title: 'Full Stack Developer',
    company_name: 'Meta',
    icon: meta,
    iconBg: '#E6DEDD',
    date: 'Jan 2023 - Present',
    points: [
      'Developing and maintaining web applications using React.js and other related technologies.',
      'Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.',
      'Implementing responsive design and ensuring cross-browser compatibility.',
      'Participating in code reviews and providing constructive feedback to other developers.',
    ],
  },
]

export const testimonials = [
  {
    testimonial: "I thought it was impossible to make a website as beautiful as our product, but they proved me wrong.",
    name: 'Dan Corwells',
    designation: 'CFO',
    company: 'DETOUR Co',
    image: 'https://randomuser.me/api/portraits/men/82.jpg',
  },
  {
    testimonial: "I've never met a web developer who truly cares about their clients' success like this.",
    name: 'Chris Devens ',
    designation: 'COO',
    company: 'DEF Corp',
    image: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
  {
    testimonial: 'After the website optimization, our traffic increased by 50%. We can\'t thank them enough!',
    name: 'Lisa Wang',
    designation: 'CTO',
    company: '456 Enterprises',
    image: 'https://randomuser.me/api/portraits/women/6.jpg',
  },
]

export const projects = [
  {
    name: 'Car Rent',
    description: 'Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.',
    tags: [
      { name: 'react',    color: '#00f5ff' },
      { name: 'mongodb',  color: '#00d084' },
      { name: 'tailwind', color: '#bf5fff' },
    ],
    image: carrent,
    source_code_link: 'https://github.com/',
  },
  {
    name: 'Job IT',
    description: 'Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.',
    tags: [
      { name: 'react',   color: '#00f5ff' },
      { name: 'restapi', color: '#00d084' },
      { name: 'scss',    color: '#bf5fff' },
    ],
    image: jobit,
    source_code_link: 'https://github.com/',
  },
  {
    name: 'Trip Guide',
    description: 'A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.',
    tags: [
      { name: 'nextjs',   color: '#00f5ff' },
      { name: 'supabase', color: '#00d084' },
      { name: 'css',      color: '#bf5fff' },
    ],
    image: tripguide,
    source_code_link: 'https://github.com/',
  },
]
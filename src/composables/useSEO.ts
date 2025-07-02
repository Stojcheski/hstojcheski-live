// src/composables/useSEO.ts
import { onMounted } from 'vue'

interface SEOData {
  title?: string
  description?: string
  keywords?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  canonicalUrl?: string
}

export function useSEO(seoData: SEOData = {}) {
  const defaultTitle = 'Hristijan Stojcheski - Salesforce Developer & Full-Stack Engineer'
  const defaultDescription =
    'Experienced Salesforce Platform Developer II specializing in Apex, Lightning Web Components, and OmniStudio. Also skilled in Vue.js, Node.js, and MongoDB for full-stack development.'

  const updateMetaTag = (name: string, content: string) => {
    let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement
    if (!element) {
      element = document.createElement('meta')
      element.name = name
      document.head.appendChild(element)
    }
    element.content = content
  }

  const updatePropertyTag = (property: string, content: string) => {
    let element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement
    if (!element) {
      element = document.createElement('meta')
      element.setAttribute('property', property)
      document.head.appendChild(element)
    }
    element.content = content
  }

  const updateCanonical = (url: string) => {
    let element = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (!element) {
      element = document.createElement('link')
      element.rel = 'canonical'
      document.head.appendChild(element)
    }
    element.href = url
  }

  const setSEO = () => {
    document.title = seoData.title ? `${seoData.title} | ${defaultTitle}` : defaultTitle

    updateMetaTag('description', seoData.description || defaultDescription)

    if (seoData.keywords) {
      updateMetaTag('keywords', seoData.keywords)
    }
    updatePropertyTag('og:title', seoData.ogTitle || seoData.title || defaultTitle)
    updatePropertyTag(
      'og:description',
      seoData.ogDescription || seoData.description || defaultDescription,
    )

    if (seoData.ogImage) {
      updatePropertyTag('og:image', seoData.ogImage)
    }
    updatePropertyTag('twitter:title', seoData.ogTitle || seoData.title || defaultTitle)
    updatePropertyTag(
      'twitter:description',
      seoData.ogDescription || seoData.description || defaultDescription,
    )

    if (seoData.ogImage) {
      updatePropertyTag('twitter:image', seoData.ogImage)
    }
    if (seoData.canonicalUrl) {
      updateCanonical(seoData.canonicalUrl)
    }
  }

  onMounted(() => {
    setSEO()
  })

  return {
    setSEO,
  }
}

// Usage example for different pages:
export const pagesSEO = {
  home: {
    title: 'Home',
    description:
      'Portfolio of Hristijan Stojcheski - Salesforce Platform Developer II with expertise in Vue.js and full-stack development',
    keywords:
      'Salesforce Developer, Portfolio, Hristijan Stojcheski, Platform Developer II, Vue.js, Node.js',
    canonicalUrl: 'https://hstojcheski.live/',
  },
  about: {
    title: 'About Me',
    description:
      "Learn about Hristijan Stojcheski's background, education, and journey from Computer Science to Salesforce development and modern web technologies",
    keywords:
      'About Hristijan Stojcheski, Salesforce Developer Background, Computer Science, Bitola, Avenga',
    canonicalUrl: 'https://hstojcheski.live/about',
  },
  projects: {
    title: 'Projects',
    description:
      "Explore Hristijan Stojcheski's portfolio including Salesforce implementations, Vue.js applications, and full-stack development projects",
    keywords:
      'Salesforce Projects, Vue.js Portfolio, Full-Stack Projects, LWC, OmniStudio, MongoDB',
    canonicalUrl: 'https://hstojcheski.live/projects',
  },
  blog: {
    title: 'Blog',
    description:
      'Technical insights and tutorials on Salesforce development, Vue.js, Node.js, and modern web development practices',
    keywords:
      'Salesforce Blog, Vue.js Tutorials, Technical Blog, Web Development, Apex, Lightning Components',
    canonicalUrl: 'https://hstojcheski.live/blog',
  },
  experience: {
    title: 'Experience',
    description:
      'Professional experience as Salesforce Platform Developer II at Avenga, working on enterprise B2B telecom solutions',
    keywords:
      'Salesforce Experience, Avenga, B2B Telecom, Platform Developer II, Professional Experience',
    canonicalUrl: 'https://hstojcheski.live/experience',
  },
  skills: {
    title: 'Skills',
    description:
      'Technical skills including Salesforce development, Vue.js, Node.js, MongoDB, Apex, Lightning Web Components, and OmniStudio',
    keywords:
      'Salesforce Skills, Vue.js Skills, Technical Skills, Apex, LWC, OmniStudio, Full-Stack Development',
    canonicalUrl: 'https://hstojcheski.live/skills',
  },
  contact: {
    title: 'Contact',
    description:
      'Get in touch with Hristijan Stojcheski for Salesforce development opportunities, collaboration, or technical discussions',
    keywords:
      'Contact Hristijan Stojcheski, Salesforce Developer Contact, Collaboration, Technical Discussion',
    canonicalUrl: 'https://hstojcheski.live/contact',
  },
}

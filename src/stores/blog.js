import { defineStore } from 'pinia'

export const useBlogStore = defineStore('blog', {
  state: () => ({
    posts: [
      {
        id: 1,
        title: 'Getting Started with Salesforce Omnistudio',
        date: 'April 15, 2025',
        summary:
          'Learn how to leverage Salesforce Omnistudio components to build powerful, responsive interfaces for your enterprise applications.',
        content: `
          <p>Salesforce Omnistudio (formerly Vlocity) provides a suite of declarative tools that enable developers and admins to build complex, industry-specific applications with minimal coding.</p>

          <h2>Key Components of Omnistudio</h2>

          <h3>OmniScripts</h3>
          <p>OmniScripts allow you to create guided, interactive forms and workflows for users. They're responsive, work across all devices, and can be embedded anywhere in Salesforce.</p>

          <h3>DataRaptors</h3>
          <p>DataRaptors are data integration tools that let you extract, transform, and load data within Salesforce. They're essential for creating the data layer for your Omnistudio applications.</p>

          <h3>FlexCards</h3>
          <p>FlexCards provide a way to display and interact with data in a card-based format. They're highly customizable and can be used to create responsive UI components.</p>

          <h3>Integration Procedures</h3>
          <p>Integration Procedures let you orchestrate complex backend processes, including callouts to external systems, data transformations, and conditional logic.</p>

          <h2>Getting Started</h2>

          <p>To begin working with Omnistudio, you'll need to:</p>

          <ol>
            <li>Ensure your Salesforce org has Omnistudio installed</li>
            <li>Familiarize yourself with the Omnistudio data model</li>
            <li>Learn to create DataRaptors for your data operations</li>
            <li>Build OmniScripts for your user workflows</li>
            <li>Design FlexCards for your UI components</li>
          </ol>

          <p>In future articles, we'll dive deeper into each component with practical examples and best practices.</p>
        `,
      },
      {
        id: 2,
        title: 'Best Practices for Apex Development',
        date: 'March 28, 2025',
        summary:
          'Discover the most effective patterns and practices for writing maintainable, efficient Apex code in your Salesforce implementations.',
        content: `
          <p>Apex is Salesforce's proprietary programming language that allows developers to execute flow and transaction control statements on the platform. When writing Apex code, following best practices is essential for creating maintainable, efficient, and scalable applications.</p>

          <h2>1. Bulkify Your Code</h2>

          <p>Always write your code to handle bulk operations. This means processing records in batches rather than one at a time. This is crucial because:</p>

          <ul>
            <li>Salesforce enforces governor limits on resources like SOQL queries and DML operations</li>
            <li>Batch processes like data imports can fail if your code isn't bulkified</li>
          </ul>

          <h2>2. Use SOQL for Loops for Large Data Sets</h2>

          <p>When dealing with large data volumes, SOQL for loops help you avoid hitting heap size limits.</p>

          <h2>3. Implement Error Handling</h2>

          <p>Robust error handling improves the user experience and makes troubleshooting easier. Always use try-catch blocks for operations that might fail.</p>

          <h2>4. Follow the Single Responsibility Principle</h2>

          <p>Each class and method should have a single purpose. This makes your code more maintainable, testable, and easier to understand.</p>

          <h2>5. Write Comprehensive Test Classes</h2>

          <p>Test coverage is not just a deployment requirement; it's a way to ensure your code works as expected. Write tests that cover positive and negative scenarios, as well as bulk testing.</p>
        `,
      },
      {
        id: 3,
        title: 'Integrating Salesforce with External Systems',
        date: 'February 10, 2025',
        summary:
          'A comprehensive guide to connecting Salesforce with external applications using various integration patterns and techniques.',
        content: `
          <p>Salesforce provides multiple ways to integrate with external systems. Choosing the right integration pattern depends on your specific requirements, including data volume, frequency of updates, and security considerations.</p>

          <h2>Integration Patterns</h2>

          <h3>1. REST API</h3>
          <p>The Salesforce REST API provides a powerful and flexible way to access and manipulate Salesforce data programmatically. It's ideal for real-time integrations and works well with most modern programming languages.</p>

          <h3>2. SOAP API</h3>
          <p>While older than REST, the SOAP API is still widely used, especially in enterprise environments with legacy systems. It provides strong typing and comprehensive error handling.</p>

          <h3>3. Bulk API</h3>
          <p>For large data loads, the Bulk API is optimized for processing large sets of data (up to millions of records) asynchronously.</p>

          <h3>4. Streaming API</h3>
          <p>The Streaming API enables you to receive notifications when data changes in Salesforce, implementing a publish-subscribe model.</p>

          <h2>Integration Best Practices</h2>

          <ul>
            <li>Use named credentials to securely store authentication details</li>
            <li>Implement robust error handling and retry mechanisms</li>
            <li>Log integration activities for monitoring and troubleshooting</li>
            <li>Use platform events for event-driven architectures</li>
            <li>Consider using MuleSoft for complex integration scenarios</li>
          </ul>

          <p>In future articles, we'll explore each integration pattern with practical examples and implementation details.</p>
        `,
      },
    ],
  }),

  getters: {
    getPostById: (state) => (id) => {
      return state.posts.find((post) => post.id === Number(id))
    },

    getAllPosts: (state) => {
      return state.posts.map((post) => ({
        id: post.id,
        title: post.title,
        date: post.date,
        summary: post.summary,
      }))
    },
  },
})

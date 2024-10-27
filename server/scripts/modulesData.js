const { connectToDatabase, closeDatabase, getDb } = require('../scripts/database')

async function seedModules () {
  const modulesData = [
    {
      title: 'User Interface Design',
      moduleId: 'UID102',
      category: 'UXD/UID',
      assessmentBreakdown: [
        {
          title: 'Interactive Prototyping',
          percentage: 0.4,
        },
        {
          title: 'Visual Design Evaluation',
          percentage: 0.3,
        },
        {
          title: 'Accessibility Assessment',
          percentage: 0.3,
        },
      ],
      description: 'This module focuses on advanced user interface design principles. Participants will engage in interactive prototyping, evaluate visual design, and assess accessibility for user-centric designs.',
      learningObjectives: [
        'Advance understanding of user interface design.',
        'Conduct interactive prototyping exercises.',
        'Evaluate visual design principles.',
        'Assess and improve accessibility in UI design.',
      ],
      dateCreated: { $date: '2023-02-28T11:45:00.000Z' },
    },
    {
      title: 'Web Development Basics',
      moduleId: 'WEB101',
      category: 'UXD/UID',
      assessmentBreakdown: [
        {
          title: 'HTML/CSS Project',
          percentage: 0.5,
        },
        {
          title: 'JavaScript Fundamentals',
          percentage: 0.3,
        },
        {
          title: 'Responsive Design Implementation',
          percentage: 0.2,
        },
      ],
      description: 'This module introduces the basics of web development. Participants will work on an HTML/CSS project, delve into JavaScript fundamentals, and implement responsive design for web applications.',
      learningObjectives: [
        'Understand fundamental concepts in web development.',
        'Implement HTML/CSS projects.',
        'Explore JavaScript fundamentals.',
        'Implement responsive design for web applications.',
      ],
      dateCreated: { $date: '2022-11-10T14:30:00.000Z' },
    },
    {
      title: 'Big Data Analytics',
      moduleId: 'BDA101',
      category: 'dataModelling',
      assessmentBreakdown: [
        {
          title: 'Data Processing Techniques',
          percentage: 0.4,
        },
        {
          title: 'Hadoop Framework Usage',
          percentage: 0.4,
        },
        {
          title: 'Predictive Modeling with Big Data',
          percentage: 0.2,
        },
      ],
      description: 'This module explores big data analytics techniques. Participants will learn data processing techniques, use the Hadoop framework, and apply predictive modeling to large datasets.',
      learningObjectives: [
        'Deepen knowledge in big data analytics.',
        'Apply data processing techniques to large datasets.',
        'Utilize the Hadoop framework for big data tasks.',
        'Apply predictive modeling to large datasets.',
      ],
      dateCreated: { $date: '2020-09-15T10:15:00.000Z' },
    },
    {
      title: 'Cloud Native Applications',
      moduleId: 'CNA101',
      category: 'networks',
      assessmentBreakdown: [
        {
          title: 'Containerization Basics',
          percentage: 0.5,
        },
        {
          title: 'Microservices Architecture',
          percentage: 0.3,
        },
        {
          title: 'Continuous Deployment Strategies',
          percentage: 0.2,
        },
      ],
      description: 'This module focuses on developing cloud-native applications. Participants will learn containerization basics, explore microservices architecture, and implement continuous deployment strategies.',
      learningObjectives: [
        'Understand cloud-native application development.',
        'Apply containerization basics.',
        'Explore microservices architecture.',
        'Implement continuous deployment strategies.',
      ],
      dateCreated: { $date: '2021-07-20T16:45:00.000Z' },
    },
    {
      title: 'IoT Security',
      moduleId: 'IOTS101',
      category: 'networks',
      assessmentBreakdown: [
        {
          title: 'Device Authentication Protocols',
          percentage: 0.4,
        },
        {
          title: 'Data Encryption in IoT',
          percentage: 0.4,
        },
        {
          title: 'Security Best Practices for IoT Devices',
          percentage: 0.2,
        },
      ],
      description: 'This module delves into security aspects of Internet of Things (IoT). Participants will explore device authentication protocols, implement data encryption in IoT, and learn security best practices for IoT devices.',
      learningObjectives: [
        'Understand security challenges in IoT.',
        'Implement device authentication protocols.',
        'Apply data encryption techniques in IoT.',
        'Follow security best practices for IoT devices.',
      ],
      dateCreated: { $date: '2022-04-12T13:00:00.000Z' },
    },
    {
      title: 'Cloud Security',
      moduleId: 'CS101',
      category: 'networks',
      assessmentBreakdown: [
        {
          title: 'Identity and Access Management',
          percentage: 0.4,
        },
        {
          title: 'Data Encryption in Cloud Environments',
          percentage: 0.4,
        },
        {
          title: 'Incident Response in Cloud Security',
          percentage: 0.2,
        },
      ],
      description: 'This module focuses on security measures in cloud environments. Participants will explore identity and access management, implement data encryption in cloud environments, and develop incident response plans for cloud security.',
      learningObjectives: [
        'Understand security aspects in cloud environments.',
        'Implement identity and access management.',
        'Apply data encryption techniques in cloud environments.',
        'Develop incident response plans for cloud security.',
      ],
      dateCreated: { $date: '2023-06-28T14:30:00.000Z' },
    },
    {
      title: 'AI in Healthcare',
      moduleId: 'AIH101',
      category: 'artificialIntelligence',
      assessmentBreakdown: [
        {
          title: 'Medical Image Analysis',
          percentage: 0.5,
        },
        {
          title: 'Predictive Analytics for Patient Care',
          percentage: 0.3,
        },
        {
          title: 'Ethical Considerations in AI for Healthcare',
          percentage: 0.2,
        },
      ],
      description: 'This module explores the application of AI in healthcare. Participants will analyze medical images, apply predictive analytics for patient care, and discuss ethical considerations in AI for healthcare.',
      learningObjectives: [
        'Understand the use of AI in healthcare.',
        'Analyze medical images using AI.',
        'Apply predictive analytics for improved patient care.',
        'Discuss ethical considerations in AI for healthcare.',
      ],
      dateCreated: { $date: '2022-11-15T11:15:00.000Z' },
    },
    {
      title: 'DevOps Practices',
      moduleId: 'DOP101',
      category: 'softwareEngineering',
      assessmentBreakdown: [
        {
          title: 'Continuous Integration/Delivery',
          percentage: 0.5,
        },
        {
          title: 'Infrastructure as Code',
          percentage: 0.3,
        },
        {
          title: 'Monitoring and Logging Strategies',
          percentage: 0.2,
        },
      ],
      description: 'This module covers DevOps practices for efficient software development and deployment. Participants will learn continuous integration/delivery, implement infrastructure as code, and develop monitoring and logging strategies.',
      learningObjectives: [
        'Understand DevOps principles.',
        'Implement continuous integration/delivery.',
        'Utilize infrastructure as code for deployment.',
        'Develop effective monitoring and logging strategies.',
      ],
      dateCreated: { $date: '2023-01-10T09:00:00.000Z' },
    },
    {
      title: 'Game Development Fundamentals',
      moduleId: 'GDF101',
      category: 'softwareEngineering',
      assessmentBreakdown: [
        {
          title: 'Game Design Project',
          percentage: 0.6,
        },
        {
          title: 'Graphics and Animation Techniques',
          percentage: 0.3,
        },
        {
          title: 'User Experience in Gaming',
          percentage: 0.1,
        },
      ],
      description: 'This module introduces fundamentals of game development. Participants will work on a game design project, explore graphics and animation techniques, and focus on user experience in gaming.',
      learningObjectives: [
        'Understand basics of game development.',
        'Contribute to a game design project.',
        'Explore graphics and animation techniques.',
        'Focus on user experience in gaming.',
      ],
      dateCreated: { $date: '2022-07-05T16:45:00.000Z' },
    },
    {
      title: 'Quantum Computing Basics',
      moduleId: 'QCB101',
      category: 'artificialIntelligence',
      assessmentBreakdown: [
        {
          title: 'Quantum Algorithms Implementation',
          percentage: 0.4,
        },
        {
          title: 'Quantum Circuits Design',
          percentage: 0.4,
        },
        {
          title: 'Quantum Computing Theory',
          percentage: 0.2,
        },
      ],
      description: 'This module introduces quantum computing fundamentals. Participants will implement quantum algorithms, design quantum circuits, and explore quantum computing theory.',
      learningObjectives: [
        'Understand basic concepts of quantum computing.',
        'Implement quantum algorithms.',
        'Design quantum circuits.',
        'Explore quantum computing theory.',
      ],
      dateCreated: { $date: '2023-03-18T11:15:00.000Z' },
    },
    {
      title: 'Machine Learning Foundations',
      moduleId: 'MLF101',
      category: 'artificialIntelligence',
      assessmentBreakdown: [
        {
          title: 'Supervised Learning Algorithms',
          percentage: 0.5,
        },
        {
          title: 'Unsupervised Learning Techniques',
          percentage: 0.3,
        },
        {
          title: 'Model Evaluation and Tuning',
          percentage: 0.2,
        },
      ],
      description: 'This module covers the foundations of machine learning. Participants will explore supervised learning algorithms, unsupervised learning techniques, and model evaluation and tuning strategies.',
      learningObjectives: [
        'Understand machine learning fundamentals.',
        'Implement supervised learning algorithms.',
        'Explore unsupervised learning techniques.',
        'Evaluate and tune machine learning models.',
      ],
      dateCreated: { $date: '2023-02-05T12:00:00.000Z' },
    },
    {
      title: 'Natural Language Processing',
      moduleId: 'NLP101',
      category: 'artificialIntelligence',
      assessmentBreakdown: [
        {
          title: 'Text Processing Techniques',
          percentage: 0.4,
        },
        {
          title: 'Sentiment Analysis Project',
          percentage: 0.4,
        },
        {
          title: 'NLP Applications Overview',
          percentage: 0.2,
        },
      ],
      description: 'This module focuses on natural language processing (NLP). Participants will learn text processing techniques, work on a sentiment analysis project, and explore various NLP applications.',
      learningObjectives: [
        'Understand NLP fundamentals.',
        'Implement text processing techniques.',
        'Conduct sentiment analysis.',
        'Explore various applications of NLP.',
      ],
      dateCreated: { $date: '2022-12-10T10:30:00.000Z' },
    },
    {
      title: 'Blockchain Basics',
      moduleId: 'BLK101',
      category: 'dataModelling',
      assessmentBreakdown: [
        {
          title: 'Blockchain Architecture Understanding',
          percentage: 0.5,
        },
        {
          title: 'Smart Contracts Implementation',
          percentage: 0.3,
        },
        {
          title: 'Cryptocurrency Transactions Overview',
          percentage: 0.2,
        },
      ],
      description: 'This module introduces blockchain technology. Participants will understand blockchain architecture, implement smart contracts, and overview cryptocurrency transactions.',
      learningObjectives: [
        'Understand the fundamentals of blockchain technology.',
        'Explore blockchain architecture.',
        'Implement smart contracts.',
        'Overview cryptocurrency transactions.',
      ],
      dateCreated: { $date: '2023-05-10T14:30:00.000Z' },
    },
    {
      title: 'Data Visualization Techniques',
      moduleId: 'DVT101',
      category: 'dataModelling',
      assessmentBreakdown: [
        {
          title: 'Interactive Data Dashboards',
          percentage: 0.5,
        },
        {
          title: 'Data Storytelling',
          percentage: 0.4,
        },
        {
          title: 'Visualization Tools Comparison',
          percentage: 0.1,
        },
      ],
      description: 'This module explores data visualization techniques. Participants will create interactive data dashboards, engage in data storytelling, and compare different visualization tools.',
      learningObjectives: [
        'Understand principles of data visualization.',
        'Create interactive data dashboards.',
        'Engage in data storytelling.',
        'Compare different data visualization tools.',
      ],
      dateCreated: { $date: '2023-08-15T10:00:00.000Z' },
    },
    {
      title: 'Cybersecurity Fundamentals',
      moduleId: 'CSF101',
      category: 'cybersecurity',
      assessmentBreakdown: [
        {
          title: 'Threat Assessment Techniques',
          percentage: 0.4,
        },
        {
          title: 'Incident Response Plans',
          percentage: 0.4,
        },
        {
          title: 'Security Awareness Training',
          percentage: 0.2,
        },
      ],
      description: 'This module covers fundamental concepts in cybersecurity. Participants will learn threat assessment techniques, develop incident response plans, and participate in security awareness training.',
      learningObjectives: [
        'Understand cybersecurity fundamentals.',
        'Implement threat assessment techniques.',
        'Develop incident response plans.',
        'Participate in security awareness training.',
      ],
      dateCreated: { $date: '2023-07-01T12:30:00.000Z' },
    },
    {
      title: 'Mobile App Development',
      moduleId: 'MAD101',
      category: 'softwareEngineering',
      assessmentBreakdown: [
        {
          title: 'Mobile Application Project',
          percentage: 0.5,
        },
        {
          title: 'Cross-Platform Development',
          percentage: 0.4,
        },
        {
          title: 'User Interface Considerations',
          percentage: 0.1,
        },
      ],
      description: 'This module focuses on mobile app development. Participants will work on a mobile application project, explore cross-platform development, and consider user interface design.',
      learningObjectives: [
        'Understand mobile app development processes.',
        'Implement a mobile application project.',
        'Explore cross-platform development techniques.',
        'Consider user interface design for mobile applications.',
      ],
      dateCreated: { $date: '2022-05-21T13:15:00.000Z' },
    },
  ]

  const modulesCollection = getDb().collection('modules')
  const result = await modulesCollection.insertMany(modulesData)
  return result
}

async function addModules () {
  try {
    await connectToDatabase()

    const db = getDb()
    await db.collection('modules').deleteMany({})

    const seeded = await seedModules()
    console.log('Modules seeded successfully:', seeded)
  } catch (error) {
    console.error('Error seeding modules:', error)
  } finally {
    await closeDatabase()
  }
}

addModules()

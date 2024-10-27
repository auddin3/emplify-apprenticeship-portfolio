const { ObjectId } = require('mongodb')
const { connectToDatabase, closeDatabase, getDb } = require('./database')

async function seedPortfolioEntries () {
  const portfolioEntriesData = [
    {
      portfolio: new ObjectId('65db659ad8c16c7a6b9974fc'),
      skill: 'C4',
      module: 'AIH101',
      dateCreated: new Date('2024-04-28T22:50:52.000Z'),
      q1: 'My involvement in the AI in Healthcare project was hands-on and collaborative. As a team member, I contributed to all project phases, from planning to execution. I conducted literature reviews, collected and preprocessed data, and developed machine learning algorithms for medical image analysis. Additionally, I assisted in creating prototypes for AI-driven diagnostic tools and documented project progress. Our interdisciplinary team comprised data scientists, medical professionals, and cybersecurity experts, fostering a dynamic environment. Through effective communication and teamwork, we achieved our objectives, deepening my understanding of both AI applications in healthcare and the critical intersection with cybersecurity.',
      q2: 'In the project, my contributions spanned various essential tasks pivotal for its success. I actively engaged in brainstorming sessions, offering insights and ideas to shape our approach. Across multiple fronts, I undertook responsibilities such as conducting extensive literature reviews to inform our understanding of AI in healthcare. This involved synthesizing key findings from diverse sources to guide our project strategy effectively. Subsequently, I meticulously collected and preprocessed data, ensuring its quality and reliability for subsequent analysis. Leveraging my proficiency in machine learning, I developed and fine-tuned algorithms tailored to our specific objectives, constantly iterating to optimize performance. Simultaneously, I collaborated closely with team members, providing support where needed and ensuring alignment with project goals and timelines.\n\nMy assigned tasks encompassed a wide range of activities, including data collection and preprocessing, algorithm development, prototype creation, and project documentation. To execute these tasks efficiently, I followed a structured approach. Beginning with thorough literature reviews, I synthesized relevant information to inform our project direction. Subsequent steps involved methodical data collection and preprocessing, algorithm development, prototype creation, and meticulous documentation of progress and outcomes. Throughout the process, effective communication and collaboration with team members were paramount, ensuring synergy and alignment towards achieving our project objectives.',
      q3: 'The outcomes of my contributions were pivotal to the project\'s success and completion. My actions significantly impacted various facets of the project, including the quality of research, the effectiveness of algorithms, and the development of prototypes. By conducting comprehensive literature reviews and collecting high-quality data, I provided a solid foundation for our analyses and decision-making processes. The algorithms I developed contributed to accurate medical image analysis, enhancing the potential for real-world application. Moreover, the prototypes I helped create demonstrated the feasibility and potential impact of AI-driven diagnostic tools in healthcare settings.\n\nOverall, my contributions played a crucial role in achieving our project objectives and delivering tangible outcomes. Through this experience, I learned the importance of collaboration, adaptability, and perseverance in tackling complex interdisciplinary projects. Additionally, I gained insights into the practical applications of AI in healthcare and the critical role of thorough research and development in driving innovation. This experience reinforced my passion for leveraging technology to address real-world challenges and deepened my appreciation for the intersection of AI, healthcare, and cybersecurity.',
      q4: 'Participating in this project provided invaluable opportunities for skill development and enhancement. I honed my abilities in research, data analysis, algorithm development, and project management. Additionally, collaboration and communication skills were strengthened through working closely with diverse team members. These skills are transferable and will be instrumental in future endeavors. I plan to apply them in various contexts, from academic research to professional projects, leveraging AI and data-driven approaches to solve complex problems. Moreover, the experience heightened my awareness of the importance of interdisciplinary collaboration and continuous learning in navigating dynamic and challenging environments, shaping my approach to future endeavors.',
    },
    {
      portfolio: new ObjectId('65db659ad8c16c7a6b9974fc'),
      skill: 'C4',
      module: 'IOTS101',
      dateCreated: new Date('2024-04-28T22:52:55.000Z'),
      q1: 'I actively participated in the IoT Security module project, engaging in hands-on activities and collaborative discussions. My primary deliverables included conducting research on IoT security vulnerabilities and developing strategies to mitigate risks. Throughout the project, I was part of a dedicated team comprising cybersecurity experts, IoT specialists, and data analysts, fostering interdisciplinary collaboration.',
      q2: 'Assigned tasks included conducting vulnerability assessments, developing encryption protocols, and implementing security measures for IoT devices. I meticulously researched emerging threats and vulnerabilities, analyzing their potential impact on IoT systems. Subsequently, I collaborated with teammates to design and implement robust security solutions, ensuring the confidentiality, integrity, and availability of data transmitted by IoT devices.',
      q3: 'My contributions significantly bolstered the security posture of our IoT systems, mitigating potential risks and vulnerabilities. By implementing encryption protocols and access controls, we fortified the resilience of our IoT infrastructure against cyber threats. This proactive approach ensured the successful completion of the project while enhancing my understanding of IoT security principles and best practices.',
      q4: 'This experience enriched my skills in vulnerability assessment, risk management, and cybersecurity strategy development. I plan to leverage these skills in future endeavors by applying them to complex IoT projects and cybersecurity initiatives. Additionally, the interdisciplinary collaboration honed my teamwork and communication skills, which will be invaluable in navigating diverse professional environments and tackling multifaceted challenges effectively.',
    },
    {
      portfolio: new ObjectId('65db659ad8c16c7a6b9974fc'),
      skill: 'C6',
      module: 'BCT101',
      dateCreated: new Date('2024-04-28T22:55:19.000Z'),
      q1: 'I actively participated in the Blockchain Technology module project, engaging in practical exercises and collaborative discussions. My primary deliverables included understanding blockchain fundamentals, developing smart contracts, and exploring use cases for blockchain technology. Throughout the project, I was part of a dedicated team comprising blockchain developers, cryptographers, and system architects, fostering interdisciplinary collaboration.',
      q2: 'Assigned tasks included studying blockchain principles, implementing smart contracts using Solidity, and analyzing real-world blockchain applications. I conducted in-depth research on blockchain technology, exploring its decentralized architecture and consensus mechanisms. Subsequently, I collaborated with teammates to develop and deploy smart contracts, ensuring their functionality and security within the blockchain network.',
      q3: 'My contributions facilitated the successful implementation of smart contracts and the exploration of blockchain use cases across various industries. By actively engaging in discussions and hands-on exercises, I deepened my understanding of information systems and their integration with blockchain technology. This experience broadened my perspective on decentralized systems and their potential to revolutionize traditional information systems.',
      q4: 'This experience enhanced my skills in blockchain development, smart contract programming, and critical analysis of information systems. I plan to apply these skills in future endeavors by leveraging blockchain technology to improve the security, transparency, and efficiency of information systems in diverse domains. Additionally, the collaborative nature of the project honed my teamwork and communication skills, which are essential for effective collaboration in multidisciplinary projects.',
    },
    {
      portfolio: new ObjectId('65db65dfd8c16c7a6b9974fd'),
      skill: 'C7',
      module: 'CS101',
      dateCreated: new Date('2024-04-28T23:00:25.000Z'),
      q1: 'I actively participated in the Cloud Security module project, engaging in practical exercises and collaborative discussions. My primary involvement centered around understanding cloud security principles, identifying vulnerabilities, and implementing security controls within cloud environments. I worked closely with a team comprising cloud architects, cybersecurity specialists, and network engineers to ensure the security and integrity of cloud infrastructure.',
      q2: 'I actively participated in the Cloud Security module project, engaging in practical exercises and collaborative discussions. My primary involvement centered around understanding cloud security principles, identifying vulnerabilities, and implementing security controls within cloud environments. I worked closely with a team comprising cloud architects, cybersecurity specialists, and network engineers to ensure the security and integrity of cloud infrastructure.',
      q3: 'My contributions significantly bolstered the security posture of our cloud infrastructure, mitigating potential risks and vulnerabilities. By implementing robust security controls and encryption mechanisms, we ensured the confidentiality, integrity, and availability of data stored and processed in the cloud. This proactive approach contributed to the overall success of the project and deepened my understanding of computer and network infrastructure security principles.',
      q4: 'This experience enhanced my skills in cloud security, risk assessment, and security implementation within complex network environments. I plan to apply these skills in future endeavors by implementing robust security measures in cloud-based applications and infrastructure. Additionally, the collaborative nature of the project honed my teamwork and communication skills, which are essential for effective collaboration in multidisciplinary projects involving computer and network infrastructure security.',
    },
    {
      portfolio: new ObjectId('65db65dfd8c16c7a6b9974fd'),
      skill: 'C4',
      module: 'AIH101',
      dateCreated: new Date('2024-04-28T23:02:16.000Z'),
      q1: 'In the AI in Healthcare module project, I actively participated in research, development, and implementation phases. My primary deliverables included understanding AI applications in healthcare, identifying cybersecurity risks, and devising strategies to address them. I collaborated with a multidisciplinary team consisting of healthcare professionals, data scientists, and cybersecurity experts to ensure the secure integration of AI technologies in healthcare settings.',
      q2: 'Assigned tasks involved researching AI applications in healthcare, analyzing cybersecurity vulnerabilities, and developing strategies to mitigate risks. I began by conducting extensive research on AI-driven healthcare solutions and their potential cybersecurity implications. Subsequently, I collaborated with team members to assess cybersecurity risks associated with AI deployment in healthcare environments. We then developed and implemented robust security measures, such as encryption protocols and access controls, to safeguard patient data and AI systems from potential cyber threats.',
      q3: 'My contributions enhanced the security posture of AI systems deployed in healthcare settings, mitigating potential cybersecurity risks and vulnerabilities. By implementing robust security measures, we ensured the confidentiality, integrity, and availability of patient data and AI-driven healthcare solutions. This proactive approach contributed to the successful integration of AI technologies in healthcare while deepening my understanding of the critical intersection between AI and cybersecurity.',
      q4: 'This experience enhanced my skills in cybersecurity risk assessment, security implementation, and interdisciplinary collaboration. I plan to apply these skills in future endeavors by ensuring the secure deployment of AI technologies across various industries, particularly in healthcare. Additionally, the collaborative nature of the project honed my teamwork and communication skills, which are essential for effective collaboration in multidisciplinary projects involving AI and cybersecurity.',
    },
    {
      portfolio: new ObjectId('65db659ad8c16c7a6b9974fc'),
      skill: 'C1',
      module: 'BDA101',
      dateCreated: new Date('2024-04-30T21:03:54.000Z'),
      q1: 'the',
      q2: 'the',
      q3: 'the',
      q4: 'the',
    },
    {
      portfolio: new ObjectId('65db659ad8c16c7a6b9974fc'),
      skill: 'C2',
      module: 'BDA101',
      dateCreated: new Date('2024-04-30T21:11:08.000Z'),
      q1: 'trest',
      q2: 'trst',
      q3: 'trst',
      q4: 'trst',
    },
  ]

  const portfolioEntriesCollection = getDb().collection('portfolioEntries')
  const result = await portfolioEntriesCollection.insertMany(portfolioEntriesData)
  return result
}

async function addPortfolioEntries () {
  try {
    await connectToDatabase()

    const db = getDb()
    await db.collection('portfolioEntries').deleteMany({})

    const seeded = await seedPortfolioEntries()
    console.log('portfolioEntries seeded successfully:', seeded)
  } catch (error) {
    console.error('Error seeding portfolioEntries:', error)
  } finally {
    await closeDatabase()
  }
}

addPortfolioEntries()

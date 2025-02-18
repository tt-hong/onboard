const projects = [
  {
    title: "Futures Platform",
    description:
      "Make foresight accessible, easy and practical for organisations, and empower teams to work with the future in a wide range of use cases - from strategic planning to product development, innovation and risk management.",
    image: "/images/projects/future.png",
    link: "https://www.futuresplatform.com/",
  },
  {
    title: "Vaadin Framework",
    description:
      "Create modern full-stack web apps in Java with a rich UI component library, seamless backend integration, and first-party support. No need for JavaScript or HTML.",
    image: "/images/projects/vaadin.png",
    link: "https://vaadin.com/",
  },
  {
    title: "Insightus",
    description:
      "Smart Road & Bridge Mapping: an advanced mapping application that provides high-resolution maps of roads, bridges, and urban streets. It features real-time traffic updates, infrastructure data, and AI-powered analytics to support navigation, urban planning, and road maintenance. Designed for city planners, engineers, and transportation agencies, the app ensures efficient monitoring and decision-making for smarter infrastructure management.",
    image: "/images/projects/insightus.png",
    link: "https://insightus.com.au/",
  },
];

export const ProjectPage = () => {
  return (
    <main className="container mx-auto px-6 py-8 h-full flex-1">
      <h1 className="text-4xl font-bold mb-8">Past Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <a
            href={project.link}
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              width={300}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-600">{project.description}</p>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
};

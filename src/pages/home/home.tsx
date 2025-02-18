import { Code, Database } from "lucide-react";

const skills = [
  { name: "HTML/CSS", icon: Code },
  { name: "JavaScript", icon: Code },
  { name: "NodeJS", icon: Code },
  { name: "PostgreSQL", icon: Database },
];

export const HomePage = () => {
  return (
    <main className="container mx-auto px-6 py-8 h-full flex-1">
      <div className="flex flex-col items-center h-full space-y-8">
        <img
          src="/me.jpg"
          alt="Profile Picture"
          width={200}
          height={200}
          className="rounded-full mb-6"
        />
        <h1 className="text-4xl font-bold mb-4">Welcome to My Profile</h1>
        <p className="text-xl mb-8 text-center max-w-2xl">
          I&apos;m a passionate developer with experience in web development. I
          work with React, Node.js to build web applications.
        </p>
        <div className="w-full max-w-md">
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Skills Highlight</h2>
            <ul className="space-y-2">
              {skills.map((skill, index) => (
                <li key={index} className="flex items-center">
                  <skill.icon className="w-6 h-6 mr-2" />
                  <span>{skill.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

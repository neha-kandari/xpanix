import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const categories = ["All", "Web Development", "UI/UX Design"];

const projects = [
  
  {
    id: 5,
    title: "Travel Agency Website",
    description: "An engaging travel website offering tour packages, destination galleries, and inquiry forms to attract potential travelers.",
    image: "/2.png",
    category: "Web Development",
    technologies: ["html", "css", "javascript", "bootstrap"],
    liveUrl: "https://www.ruhanitrips.com/",
    featured: true,
  },
  {
    id: 6,
    title: "Art Gallery Website",
    description: "A visually rich online art gallery showcasing artwork collections, artist bios, and exhibition details.",
    image: "/6.png",
    category: "Web Development",
    technologies: ["html", "css", "javascript", "bootstrap"],
    liveUrl: "https://neha-kandari.github.io/photoframe/#home",
    featured: true,
  },
  {
    id: 7,
    title: "Gym Website",
    description: "A Figma-based design for a fitness-focused website featuring workout plans, trainer profiles, and membership options.",
    image: "/7.png",
    category: "UI/UX Design",
    technologies: ["figma"],
    liveUrl: "https://www.figma.com/proto/b1wR3W4cUSryI4rBCJZpKR/Fitness---Gym-Website-Design--Fitmaker---Community-?page-id=0%3A1&node-id=2-47&viewport=358%2C196%2C0.09&t=mwZMGDfZmv7MZiUO-1&scaling=min-zoom&content-scaling=fixed",
  },
  {
    id: 8,
    title: "E-commerce Website",
    description: "A full-featured e-commerce platform with product listings, modern UI components, and a responsive layout built using the latest stack.",
    image: "/9.png",
    category: "Web Development",
    technologies: ["next.js", "tailwindcss", "typescript", "shadcn/ui"],
    liveUrl: "https://pmakemobilelcd.com/",
  },
  {
    id: 9,
    title: "Interior Design Website",
    description: "A creative Figma prototype for an interior design firm, highlighting project galleries, service sections, and design concepts.",
    image: "/8.png",
    category: "UI/UX Design",
    technologies: ["figma"],
    liveUrl: "https://www.figma.com/proto/Idofiu2yi7cPfZXd53ySWR/Panto---Furniture-Landing-Page-Design--Community-?page-id=0%3A1&node-id=1-2&p=f&viewport=489%2C487%2C0.13&t=VHCoQAXjUXJufzTR-1&scaling=min-zoom&content-scaling=fixed",
  },
  {
    id: 10,
    title: "Furniture E-commerce Website",
    description: "A clean and elegant e-commerce UI/UX concept for a furniture brand, featuring product views, categories, and smooth interactions.",
    image: "/10.png",
    category: "UI/UX Design",
    technologies: ["figma"],
    liveUrl: "https://www.figma.com/proto/lpHV3fKVx2mYmgBysqr0fg/eCommerce-Website-%7C-Web-Page-Design?page-id=0%3A1&node-id=117-336&p=f&viewport=200%2C264%2C0.07&t=Ly4kCpErwUh0JVJl-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=117%3A1143",
  },

];

const AllProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAllProjects, setShowAllProjects] = useState(false);

  const filteredProjects = useMemo(() => {
    return selectedCategory === "All"
      ? projects
      : projects.filter(project => project.category === selectedCategory);
  }, [selectedCategory]);

  const displayedProjects = useMemo(() => {
    return showAllProjects
      ? filteredProjects
      : filteredProjects.slice(0, 4);
  }, [showAllProjects, filteredProjects]);

  // Reset to show less when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setShowAllProjects(false);
  };

  return (
    <div id="all-projects" className="min-h-screen pt-0 md:pt-4 bg-black text-white">
      {/* All Projects */}
              <section className="py-4 md:py-8 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-white">All Projects</h2>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all duration-300 text-xs md:text-sm ${
                  selectedCategory === category
                    ? "bg-slate-600 text-white shadow-md"
                    : "bg-neutral-900 text-white hover:bg-slate-800 border border-neutral-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-6">
            {displayedProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-neutral-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-neutral-700 flex flex-col h-full text-white"
              >
                {/* Responsive image container */}
                <div className="relative h-32 md:h-40 lg:h-48 overflow-hidden bg-black">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="px-1.5 py-0.5 bg-slate-700 text-white text-[10px] md:text-xs rounded">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                {/* Content area with flex-grow */}
                <div className="p-2 md:p-3 lg:p-4 flex flex-col flex-grow">
                  <h3 className="text-sm md:text-base lg:text-lg font-bold mb-1 md:mb-2 line-clamp-2 text-white">{project.title}</h3>
                  <p className="text-white text-xs md:text-sm mb-2 md:mb-3 line-clamp-2 md:line-clamp-3 flex-grow">
                    {project.description}
                  </p>
                  
                  {/* Technologies - responsive */}
                  <div className="hidden md:flex flex-wrap gap-1.5 mb-3 min-h-[24px]">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-neutral-800 text-white text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Button at bottom */}
                  <div className="mt-auto">
                    <Link
                      to={project.liveUrl}
                      className="block w-full text-center py-1.5 md:py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors text-xs md:text-sm"
                    >
                      View Project
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show More/Less Button */}
          {filteredProjects.length > 4 && (
            <div className="text-center">
              <button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="inline-flex items-center gap-2 px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg group text-sm md:text-base"
              >
                {showAllProjects ? (
                  <>
                    Show Less Projects
                    <ArrowRight size={16} className="rotate-90 group-hover:translate-y-1 transition-transform" />
                  </>
                ) : (
                  <>
                    Show More Projects ({filteredProjects.length - 4} more)
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AllProjectsSection; 
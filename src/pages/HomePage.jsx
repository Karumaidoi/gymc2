import { Button, Spin, Tag } from "antd";
import { useProjects } from "../hooks/useProjects";

import { useCurrentUser } from "../hooks/useCurrentUser";
import { useCreateBid } from "../hooks/useCreateBid";

function HomePage() {
  const { projects, fetchingProjects } = useProjects();
  const { currentUser, fetchingUser } = useCurrentUser();
  const { createBidAPI } = useCreateBid();

  // Handle adding Bids
  function handleClick(project) {
    const newBid = {
      projectId: project?.id,
      user: currentUser?.at(0).id,
      isVerified: false,
    };

    createBidAPI(newBid, {});

    console.log(newBid);
  }

  if (fetchingProjects || fetchingUser) {
    return (
      <div>
        <Spin />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 shadow-sm bg-white shadow-slate-100 md:grid-cols-3">
      {projects.map((project, index) => (
        <div className="flex flex-col items-start" key={index}>
          <img className="h-[10rem] w-full object-cover" src={project?.image} />

          <div className="flex items-center gap-3 mt-4 mb-6">
            <h3 className="">{project?.name}</h3>
            <Tag color="processing">
              {project?.noBags > 0 ? "Available" : ""}
            </Tag>

            <h3 className="">{project?.noBags} Available</h3>
          </div>

          <h3 className="mb-6">{project?.type}</h3>

          <h6 className="mb-4">
            Location:{" "}
            <Tag color="success">{project?.location ?? "Machakos"}</Tag>
          </h6>

          <Button
            disabled={project?.noBags < 1}
            onClick={() => handleClick(project)}
            className="w-full"
          >
            Book
          </Button>
        </div>
      ))}
    </div>
  );
}

export default HomePage;

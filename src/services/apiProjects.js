import { supabase } from "./supabase";

export async function getProjects() {
  const { data, error } = await supabase.from("center").select();

  if (error) {
    throw new Error(error?.message);
  }

  return data;
}

export async function updateProject(projectId, noBags) {
  console.log(noBags);
  const { data, error } = await supabase
    .from("center")
    .update({ noBags: noBags })
    .eq("id", projectId);

  if (error) {
    throw new Error(error?.message);
  }

  return data;
}

export async function createBid({ projectId, User: userId, noBags }) {
  const { data, error } = await supabase.from("Orders").insert({
    user: userId,
    isVerified: false,
  });

  if (error) {
    throw new Error(error?.message);
  }

  try {
    const newProject = await updateProject(projectId, noBags);
    console.log(newProject);
  } catch (error) {
    throw new Error(error?.message);
  }

  return data;
}

export async function getBids() {
  const { data, error } = await supabase.from("center").select();

  if (error) {
    throw new Error(error?.message);
  }

  return data;
}

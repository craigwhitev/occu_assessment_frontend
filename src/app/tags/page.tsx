import Navbar from "@/Component/Header/Navbar";
import TagsBoard from "@/Component/Tags/TagsBoard";

const page = () => {
  return (
    <div className="container mx-auto h-screen">
      <Navbar />
      <TagsBoard />
    </div>
  );
}

export default page;
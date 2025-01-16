import Navbar from "@/Component/Header/Navbar";
import TagsBoard from "@/Component/Tags/TagsBoard";

const page = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto h-screen">
        <TagsBoard />
      </div>
    </div>
  );
}

export default page;
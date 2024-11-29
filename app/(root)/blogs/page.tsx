import BlogsComponent from "@/components/shared/BlogsComponent";


const Blogs = () => {

  return (
    <div className="custom-container py-20">
      <div className="mb-16 relative left-0">
        <h1 className="main-heading text-left md:text-5xl font-bold w-[80%]">
          Discover New Perspectives on Professional Growth and Efficiency
        </h1>
        <p className="text-[#acadad] pt-3 text-xl font-[500] w-[80%]">
          Uncover valuable strategies to maximize your professional journey, optimize time, and unlock opportunities for knowledge monetization.
        </p>
     </div>
      <BlogsComponent/>
    </div>
  );
};

export default Blogs;

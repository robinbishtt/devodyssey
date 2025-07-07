import react, { useEffect, useState } from "react";

function Home() {
  const blogs = [
    { title: "Python", content: "Spandilabro hegde kample zuschi" },
    { title: "Java", content: "Hombre unn kutze unn micheal" },
    { title: "JavaScript", content: "Monosante itaricog campe" },
    { title: "C++", content: "Deler quento amretino labrino" },
    { title: "C#", content: "Lorem ipsum dolor amit set contrel" },
  ];

  const [Paused, setPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % blogs.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? blogs.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!Paused) {
      const interval = setInterval(() => {
        handleNext();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [Paused, currentIndex]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[url(../../src/assets/background.jpg)] bg-center bg-cover">
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-black/60">
          <h1 className="flex gap-2 text-3xl font-bold">
            Welcome to
            <strong className="font-extrabold text-blue-900">
              DevOdyssey!
            </strong>
          </h1>
          <p>A blogging platform for everyone</p>
        </div>
      </div>
      <div className="p-5 bg-gradient-to-br from-black to-white">
        <h3 className="mt-12 mb-5 text-xl font-bold">What is DevOdyssey?</h3>
        <p className="text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni eaque
          hic earum accusamus quibusdam excepturi quo magnam eos commodi eum,
          officiis blanditiis quis possimus. Totam delectus temporibus quasi
          illo, natus eveniet alias labore corporis! Tempora officia temporibus,
          nam quam praesentium distinctio iusto, accusamus modi nostrum
          inventore assumenda voluptas aut unde.
        </p>

        <h3 className="mt-16 text-xl font-bold">About</h3>
        <div className="flex items-center justify-between gap-5">
          <p className="text-justify">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates
            placeat sapiente distinctio quas ut qui officiis error est impedit
            quo? At optio corporis, dignissimos illo voluptate fugiat expedita
            blanditiis eveniet doloribus! Numquam modi maxime aspernatur? Quod,
            adipisci harum cumque nobis in eos necessitatibus! Non nesciunt
            aliquam beatae excepturi quasi suscipit quam maxime officiis
            doloremque vitae sequi saepe, voluptatum voluptatem eaque.
          </p>

          <img
            className="w-[30%]"
            src="../../src/assets/background.jpg"
            alt="author"
          />
        </div>

        <h3 className="mt-16 mb-12 text-xl font-bold text-center">
          Featured Blogs
        </h3>
        <div
          className="relative w-full max-w-2xl mx-auto overflow-hidden drop-shadow-2xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="p-6 text-white rounded-xl bg-slate-800">
            <h3 className="text-lg font-bold">{blogs[currentIndex].title}</h3>
            <p className="text-sm">{blogs[currentIndex].content}</p>
          </div>
        </div>
        <div
          className="flex justify-center gap-2 mt-4"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {blogs.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`focus:outline-none ${
                currentIndex === idx ? "scale-125" : "opacity-50"
              } transition-transform`}
              aria-label={`Go to blog ${idx + 1}`}
            >
              <svg
                stroke="currentColor"
                fill={currentIndex === idx ? "blue" : "gray"}
                strokeWidth="0"
                viewBox="0 0 256 256"
                className="w-6 h-6 text-foreground"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="128" cy="128" r="28" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;

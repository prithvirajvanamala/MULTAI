export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
      <h1 className="text-5xl md:text-6xl font-bold mb-6">
        Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">MULTAI</span>
      </h1>
      <p className="text-lg md:text-xl max-w-xl text-gray-700 dark:text-gray-300">
        We deliver modern, open-source IT solutions tailored to your business needs.
      </p>
    </section>
  );
}

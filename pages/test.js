// export default () => {
//   return (

//     <div className="min-h-screen bg-blue-400 p-32 text-center">
//         <div className="md:flex">

//         <div className="bg-white rounded p-4">
//             left
//         </div>

//         <div className="bg-white rounded p-4">
//             right
//         </div>
//       </div>
//     </div>
//   )
// }

export default () => {
  return (
    <div className="min-h-screen bg-yellow-300 p-10">
      <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 m-10">
        <div className="md:flex md:flex-col md:justify-center">
          <h2 className="text-black text-4xl font-bold mb-4">
            Whoa responsive!
          </h2>
          <p className="text-black text-2xl">
            Responsive design can be done asdfasd asdfasdads asdfasdf asdfasdfs
          </p>
        </div>

        <div className="invisible sm:visible w-full h-64 rounded-lg shadow-2xl bg-black">k</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="w-full h-64 rounded-lg shadow-2xl bg-black">k</div>

        <div className="w-full h-64 rounded-lg shadow-2xl bg-black">k</div>

        <div className="w-full h-64 rounded-lg shadow-2xl bg-black">k</div>

        <div className="w-full h-64 rounded-lg shadow-2xl bg-black">k</div>
      </div>
    </div>
  );
};

import Nav from './Nav'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <>
      <Nav />
        <div class=" mx-auto bg-blue-500">
          <main>{children}</main>
        </div>
        <div>

      <Footer />
        </div>
    </>
  )
}

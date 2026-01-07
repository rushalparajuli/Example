import LoginForm from "../../components/auth/LoginForm";
import { PageHeadingWithSubtitle } from "../../components/page-heading/PageHeading";
//import {PageHeadingTitle, PageHeadingSubtitle} from "../../components/page-heading/PageHeading";
export default function LoginPage() {
  return (
    <>
      <section className="h-screen flex flex-col items-center justify-center p-2">
        <div className="w-full md:w-2xl lg:w-3xl xl:w-4xl  border border-[#a1a1a1] bg-stone-50 rounded-tl-lg rounded-br-lg p-4  py-10 ">
          {/*         
        <PageHeadingTitle title="Login From here"/>
        <PageHeadingSubtitle >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </PageHeadingSubtitle> */}

          <PageHeadingWithSubtitle title="Login Portal">
            Please enter your details to login.
          </PageHeadingWithSubtitle>
          <LoginForm />
        </div>
      </section>
    </>
  );
}

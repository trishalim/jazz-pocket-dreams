import { Button } from "@/components/Button";
import LogoIcon from "@/components/icons/LogoIcon";
import { useClerk } from "@clerk/clerk-react";

export default function LandingPage() {
  const { redirectToSignUp } = useClerk();
  return (
    <div className="bg-purple-950">
      <div className="bg-[url('/images/stars.svg')]">
        <div className="bg-gradient-to-t from-purple-900 to-transparent bg-fixed bg-no-repeat bg-center bg-cover">
          <div className="min-h-screen z-10 py-4 mx-auto px-4 text-center flex flex-col items-center gap-6 justify-center max-w-4xl md:gap-12">
            <LogoIcon className="mx-auto text-purple-100 h-12 w-auto dark:text-purple-100"></LogoIcon>
            <div>
              <h1 className="font-serif font-semibold inline text-4xl sm:text-5xl lg:text-6xl text-gradient">
                Your minimalist
                <br /> virtual book shelf
              </h1>
              <p className="text-center mt-5 sm:text-xl text-purple-100/60 tracking-tight font-light leading-relaxed">
                Track books you read without all the fuss of Goodreads.
              </p>
            </div>

            <Button
              variant="primary"
              onClick={() => redirectToSignUp()}
              size="lg"
            >
              Start tracking
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

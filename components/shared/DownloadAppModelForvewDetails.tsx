import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const DownloadAppModalForView = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[90%] rounded-md md:w-full">
        <DialogHeader>
          <DialogTitle>Download Goformeet App </DialogTitle>
          <DialogDescription>
            You can view booking details in Goformeet app
          </DialogDescription>
        </DialogHeader>
        <div>
          <p>          
            Your payment was successful! Download Goformeet App to view your booking details.
          </p>
          <Link href="https://onelink.to/zyv2v2">
            <Button className="mt-3 mx-auto secondary">Download App</Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadAppModalForView;

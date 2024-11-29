import React, { Suspense } from "react";
import HostComponent from "@/components/shared/HostComponent"; // Update the path as necessary
import Loader from "@/components/shared/Loader";

const Hosts = () => (
  <Suspense fallback={<Loader />}>
    <HostComponent />
  </Suspense>
);

export default Hosts;

import BookShelfContainer from "@/presentation/containers/BookShelfContainer";
import { Suspense } from "react";

export default async function HomePage(){
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookShelfContainer />
    </Suspense>
  );
}
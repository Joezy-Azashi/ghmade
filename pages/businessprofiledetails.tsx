import MainLayout from "../components/MainLayout";
import { useRouter } from "next/router";

function BusinessProfileDetails() {
  const router = useRouter();
  return (
    <MainLayout
      title="Community Project"
      pageTitle="Business Profile Details Page"
    >
      {}
    </MainLayout>
  );
}

export default BusinessProfileDetails;

import PageContainer from "@/components/analyze/page-container";

export default async function Home({ params }: { params: { id: string } }) {
  return (
    <div>
      <PageContainer id={params.id} />
    </div>
  );
}

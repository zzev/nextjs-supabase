export default function Page({ params }: { params: { site: string } }) {
  return <div>sites/[site] page for {params.site}</div>;
}

import { notFound } from 'next/navigation';

const colors = [
  'red', 'blue', 'green', 'yellow', 'purple',
  'orange', 'pink', 'cyan', 'magenta', 'lime'
];

export default function ColorPage({ params }: { params: { color: string } }) {
  if (!colors.includes(params.color)) {
    notFound();
  }

  return null;
}

export function generateStaticParams() {
  return colors.map(color => ({ color }));
}
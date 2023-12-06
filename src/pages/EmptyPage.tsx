export default function EmptyPage({
  message,
}: {
  message: string;
}): JSX.Element {
  return <div className="empty__page">{message}</div>;
}

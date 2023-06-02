export default function useHttpProtocol() {
  const dev = process.env.NODE_ENV !== "production";
  const protocol = dev ? "http://" : "https://";
  return protocol;
}

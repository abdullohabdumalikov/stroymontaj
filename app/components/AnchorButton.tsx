export function AnchorButton({
    href,
    children,
    variant,
}: {
    href: string;
    children: React.ReactNode;
    variant: "primary" | "secondary";
}) {
    return (
        <a
            href={href}
            className={
                variant === "primary"
                    ? "inline-flex h-14 items-center justify-center rounded-full bg-[#F39A3D] px-8 font-serif text-sm font-black text-white shadow-[0_14px_35px_rgba(243,154,61,0.32)] transition hover:-translate-y-0.5 hover:bg-[#de8429]"
                    : "inline-flex h-14 items-center justify-center rounded-full border border-[#dfd8d0] bg-white px-8 font-serif text-sm font-black text-[#2e2924] transition hover:-translate-y-0.5 hover:border-[#F39A3D] hover:text-[#F39A3D]"
            }
        >
            {children} {variant === "primary" ? <span className="ml-2">→</span> : null}
        </a>
    );
}

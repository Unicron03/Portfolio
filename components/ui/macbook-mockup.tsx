import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MacbookMockUpProps = Readonly<{
	className?: string;
	children?: ReactNode;
	src?: string;
}>;

export function MacbookMockUp({
    className,
    children,
    src,
}: MacbookMockUpProps) {
    return (
        <div className={cn("relative mx-auto my-4 w-full max-w-185", className)}>
            <div className="relative mx-auto w-[83.5%] aspect-618/418 overflow-hidden rounded-[clamp(12px,2.5vw,20px)] border-2 border-[rgb(200,202,203)] bg-[rgb(13,13,13)] px-[1.45%] pt-[1.45%] pb-[3.72%]">
                {children ? (
                    <div className="relative h-full w-full">{children}</div>
                ) : (
                    <img
                        alt="Macbook Pro background"
                        className="relative h-full w-full rounded-t-[clamp(8px,1.5vw,10px)] border-2 border-[rgb(18,18,18)] border-solid object-cover"
                        loading="lazy"
                        src={src}
                    />
                )}

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[clamp(14px,3.2vw,24px)] bg-linear-to-b from-[#272727] to-[#0d0d0d]" />
            </div>

            <div className="pointer-events-none absolute top-[clamp(8px,1.5vw,11px)] left-1/2 z-20 h-[clamp(8px,1.6vw,12px)] w-[clamp(46px,8.8vw,64px)] -translate-x-1/2 rounded-b-md bg-[rgb(13,13,13)]" />

            <div className="relative z-10 -mt-[clamp(4px,0.9vw,10px)] h-[clamp(14px,3.2vw,24px)] w-full rounded-[2px_2px_12px_12px] border-[1px_2px_0px] border-[rgb(160,163,167)] border-solid shadow-[rgb(108,112,116)_0px_-2px_8px_0px_inset] [background:radial-gradient(circle,rgb(226,227,228)_85%,rgb(200,202,203)_100%)]">
                <div className="absolute top-0 left-1/2 h-[clamp(6px,1.3vw,10px)] w-[clamp(80px,16.2vw,120px)] -translate-x-1/2 rounded-b-[10px] shadow-[inset_0_0_4px_2px_#babdbf]" />
            </div>

            <div className="pointer-events-none absolute -bottom-px left-[6.5%] h-0.5 w-[5.4%] rounded-b-full bg-neutral-600" />
            <div className="pointer-events-none absolute -bottom-px right-[6.5%] h-0.5 w-[5.4%] rounded-b-full bg-neutral-600" />
        </div>
    );
}

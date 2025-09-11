import { cn } from "@/shared/lib/utils";
import React from "react";
import { Container } from "./Container";
import Image from "next/image";
import { Button } from "../ui";
import { User } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./SearchInput";
import CartButton from "./CartButton";

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export function Header({ className, hasSearch=true, hasCart=true }: Props) {
  return (
    <header className={cn(" border-b", className)}>
      <Container className="flex items-center justify-between py-8">
        <Link href={"/"}>
          <div className="flex items-center gap-4">
            <Image src={"/logo.png"} alt="" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">
                вкусней уже некуда
              </p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        <div className="flex items-center gap-3">
          <Button className="flex items-center gap-1" variant="outline">
            <User size={16} /> Войти
          </Button>

          {
            hasCart && (
              <CartButton />
            )
          }
        </div>
      </Container>
    </header>
  );
}

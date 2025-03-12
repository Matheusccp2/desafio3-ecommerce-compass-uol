/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  X,
  Minus,
  Plus,
} from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/app/_components/ui/sheet";
import { useMobile } from "@/app/hooks/use-mobile";
import { useCart } from "../context/cart-context";

export default function Navbar() {
  const isMobile = useMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { cartItems, removeFromCart, updateQuantity, totalItems, totalPrice } =
    useCart();

  return (
    <nav className="bg-white py-4 px-4 md:px-6 sticky top-0 left-0 right-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu />
            </Button>
          )}
          <Link href="/" className="text-black text-xl font-integralcf-bold">
            SHOP.CO
          </Link>
        </div>

        {!isMobile && (
          <div className="hidden md:flex items-center space-x-6">
            <DropdownMenu>
              <DropdownMenuTrigger className="text-black flex items-center space-x-1 font-satoshi-regular">
                <span className="font-satoshi-regular">Shop</span>
                <ChevronDown size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="font-satoshi-regular">
                  Men
                </DropdownMenuItem>
                <DropdownMenuItem className="font-satoshi-regular">
                  Women
                </DropdownMenuItem>
                <DropdownMenuItem className="font-satoshi-regular">
                  Kids
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              href="/on-sale"
              className="text-black hover:text-gray-600 font-satoshi-regular"
            >
              On Sale
            </Link>
            <Link
              href="/new-arrivals"
              className="text-black hover:text-gray-600 font-satoshi-regular"
            >
              New Arrivals
            </Link>
            <Link
              href="/brands"
              className="text-black hover:text-gray-600 font-satoshi-regular"
            >
              Brands
            </Link>
          </div>
        )}

        {!isMobile && (
          <div className="hidden md:flex relative w-80 ">
            <Input
              type="text"
              placeholder="Search for products..."
              className="pl-10 pr-4 py-2 w-full rounded-full text-black bg-gray-100 border-transparent"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
        )}

        <div className="flex items-center space-x-4">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search"
            >
              <Search />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Cart"
            className="text-black relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Account"
            className="text-black"
          >
            <User />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="mt-4 px-4 py-2 bg-white border-t">
          <ul className="space-y-2">
            <li className="py-2 border-b">
              <Link
                href="/shop"
                className="flex justify-between items-center font-satoshi-regular"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
                <ChevronDown size={16} />
              </Link>
            </li>
            <li className="py-2 border-b">
              <Link
                href="/on-sale"
                className="block font-satoshi-regular"
                onClick={() => setIsMenuOpen(false)}
              >
                On Sale
              </Link>
            </li>
            <li className="py-2 border-b">
              <Link
                href="/new-arrivals"
                className="block font-satoshi-regular"
                onClick={() => setIsMenuOpen(false)}
              >
                New Arrivals
              </Link>
            </li>
            <li className="py-2">
              <Link
                href="/brands"
                className="block font-satoshi-regular"
                onClick={() => setIsMenuOpen(false)}
              >
                Brands
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* Mobile Search */}
      {isMobile && isSearchOpen && (
        <div className="mt-4 px-4 py-2 bg-white border-t">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for products..."
              className="pl-10 pr-4 py-2 w-full font-satoshi-regular"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-satoshi-regular"
              size={18}
            />
          </div>
        </div>
      )}

      {/* Cart Sheet */}
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader className="border-b pb-4">
            <SheetTitle className="font-integralcf-bold text-xl">
              Seu Carrinho
            </SheetTitle>
          </SheetHeader>

          <div className="py-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500 font-satoshi-regular">
                  Seu carrinho está vazio
                </p>
                <Button
                  variant="outline"
                  className="mt-4 font-satoshi-regular"
                  onClick={() => setIsCartOpen(false)}
                >
                  Continuar Comprando
                </Button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center py-4 border-b"
                    >
                      <div className="h-20 w-20 bg-gray-100 rounded overflow-hidden mr-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-satoshi-medium">{item.title}</h3>
                        <p className="text-gray-600 font-satoshi-regular">
                          R$ {item.price.toFixed(2)}
                        </p>
                        <div className="flex items-center mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 rounded-full"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <Minus size={12} />
                          </Button>
                          <span className="mx-2 font-satoshi-regular">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 rounded-full"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus size={12} />
                          </Button>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <X size={18} />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="pt-6 space-y-4">
                  <div className="flex justify-between border-b pb-4">
                    <span className="font-satoshi-regular">Subtotal</span>
                    <span className="font-satoshi-medium">
                      R$ {totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-satoshi-regular">Frete</span>
                    <span className="font-satoshi-medium">
                      Calculado no checkout
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          {cartItems.length > 0 && (
            <SheetFooter className="flex-col space-y-2 border-t pt-4">
              <Button className="w-full bg-black hover:bg-gray-800 font-satoshi-medium">
                Finalizar Compra
              </Button>
              <SheetClose asChild>
                <Button
                  variant="outline"
                  className="w-full font-satoshi-regular"
                >
                  Continuar Comprando
                </Button>
              </SheetClose>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </nav>
  );
}
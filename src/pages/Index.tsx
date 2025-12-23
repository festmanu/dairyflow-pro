import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-farm.jpg";
import {
  Leaf,
  Milk,
  Heart,
  Stethoscope,
  BarChart3,
  Bell,
  Shield,
  Smartphone,
  ArrowRight,
  Check,
} from "lucide-react";

const features = [
  {
    icon: Milk,
    title: "Herd Management",
    description:
      "Track individual animals with detailed profiles, pedigrees, and lifecycle events.",
  },
  {
    icon: Stethoscope,
    title: "Health Records",
    description:
      "Log vaccinations, treatments, and breeding schedules with automated reminders.",
  },
  {
    icon: Heart,
    title: "Milk Production",
    description:
      "Monitor daily yields, quality metrics, and lactation curves for every cow.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Make data-driven decisions with visual KPIs and performance reports.",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description:
      "Never miss a vaccination, calving date, or heat detection window.",
  },
  {
    icon: Smartphone,
    title: "Offline Ready",
    description:
      "Works without internet. Data syncs automatically when connection restores.",
  },
];

const stats = [
  { value: "10,000+", label: "Animals Managed" },
  { value: "500+", label: "Farms Using HerdSync" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">HerdSync</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Link to="/dashboard">
              <Button size="sm" className="gap-2">
                Go to Dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Dairy farm at sunrise"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            <Badge className="mb-4" variant="secondary">
              <Shield className="mr-1 h-3 w-3" />
              Trusted by 500+ Farms
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Modern Dairy Farm{" "}
              <span className="text-primary">Management</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl">
              Centralize your operations, improve herd health, and boost
              productivity with HerdSync – the all-in-one platform built for
              dairy farmers.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/dashboard">
                <Button size="lg" className="gap-2 text-base">
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-base">
                Watch Demo
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                No credit card required
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                14-day free trial
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                Cancel anytime
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4">
              Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Everything You Need to Run Your Dairy
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From herd tracking to financial reports, HerdSync has you covered
              with powerful yet easy-to-use tools.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/20"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-card-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
            Ready to Transform Your Dairy?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Join hundreds of farmers who are already using HerdSync to increase
            productivity and simplify their daily operations.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/dashboard">
              <Button
                size="lg"
                variant="secondary"
                className="text-base gap-2"
              >
                Start Free Trial
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-base bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Leaf className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">HerdSync</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Support
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 HerdSync. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

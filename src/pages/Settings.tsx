import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building, Bell, Users, Shield, Database, Palette } from "lucide-react";

export default function Settings() {
  return (
    <MainLayout title="Settings" subtitle="Manage your farm and app preferences">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Farm Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              <CardTitle>Farm Information</CardTitle>
            </div>
            <CardDescription>
              Basic details about your dairy farm
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="farmName">Farm Name</Label>
              <Input id="farmName" defaultValue="Green Meadows Dairy" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" defaultValue="Springfield, IL" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Contact Phone</Label>
              <Input id="phone" defaultValue="+1 (555) 123-4567" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>
              Configure how you receive alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Vaccination Reminders</p>
                <p className="text-sm text-muted-foreground">
                  Get notified before due dates
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Calving Alerts</p>
                <p className="text-sm text-muted-foreground">
                  Notifications for expected calvings
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Heat Detection</p>
                <p className="text-sm text-muted-foreground">
                  Breeding opportunity alerts
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Digest</p>
                <p className="text-sm text-muted-foreground">
                  Daily summary via email
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* User Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <CardTitle>Team Access</CardTitle>
            </div>
            <CardDescription>
              Manage users who can access this farm
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-medium">
                  JF
                </div>
                <div>
                  <p className="font-medium">John Farmer</p>
                  <p className="text-sm text-muted-foreground">Owner</p>
                </div>
              </div>
              <Badge variant="default">Admin</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground font-medium">
                  MS
                </div>
                <div>
                  <p className="font-medium">Mike Smith</p>
                  <p className="text-sm text-muted-foreground">Herdsman</p>
                </div>
              </div>
              <Badge variant="secondary">Staff</Badge>
            </div>
            <Button variant="outline" className="w-full">
              Invite Team Member
            </Button>
          </CardContent>
        </Card>

        {/* Data & Backup */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              <CardTitle>Data Management</CardTitle>
            </div>
            <CardDescription>
              Export and backup your farm data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Auto Backup</p>
                <p className="text-sm text-muted-foreground">
                  Automatically backup to cloud
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="space-y-2">
              <p className="font-medium">Export Data</p>
              <p className="text-sm text-muted-foreground mb-3">
                Download your farm records
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Export CSV
                </Button>
                <Button variant="outline" size="sm">
                  Export PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}

// Need Badge import
import { Badge } from "@/components/ui/badge";

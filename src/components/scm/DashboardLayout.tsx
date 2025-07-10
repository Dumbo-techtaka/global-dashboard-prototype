import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, TruckIcon, ArrowUpIcon, Globe, Building, Calendar, Clock, Languages } from "lucide-react";
import { InventoryOverview } from "./InventoryOverview";
import { OutboundDashboard } from "./OutboundDashboard";
import { InboundDashboard } from "./InboundDashboard";
import { useApp } from "@/context/AppContext";

export const DashboardLayout = () => {
  const { selectedLanguage, setSelectedLanguage, selectedTimezone, setSelectedTimezone, getText } = useApp();
  const [timeRange, setTimeRange] = useState("7d");

  const timezones = [
    { value: "Asia/Seoul", label: getText("koreaTimezone") },
    { value: "Asia/Singapore", label: getText("singaporeTimezone") },
    { value: "America/New_York", label: getText("usEastTimezone") },
    { value: "America/Los_Angeles", label: getText("usWestTimezone") },
    { value: "UTC", label: getText("utcTimezone") },
  ];

  const languages = [
    { value: "ko", label: "한국어" },
    { value: "en", label: "English" },
    { value: "ja", label: "日本語" },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{getText("globalScmDashboard")}</h1>
            <p className="text-muted-foreground">{getText("fulfillmentCenterManagement")}</p>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-3">

            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1d">{getText("oneDay")}</SelectItem>
                <SelectItem value="7d">{getText("sevenDays")}</SelectItem>
                <SelectItem value="30d">{getText("thirtyDays")}</SelectItem>
                <SelectItem value="90d">{getText("ninetyDays")}</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedTimezone} onValueChange={setSelectedTimezone}>
              <SelectTrigger className="w-48">
                <Clock className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timezones.map((timezone) => (
                  <SelectItem key={timezone.value} value={timezone.value}>
                    {timezone.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-32">
                <Languages className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language.value} value={language.value}>
                    {language.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{getText("totalStock")}</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,284,560</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Badge variant="secondary" className="mr-2">SG: 45%</Badge>
                <Badge variant="secondary">US: 55%</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{getText("todayOutbound")}</CardTitle>
              <TruckIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23,847</div>
              <p className="text-xs text-muted-foreground">
                <span className="inline-flex items-center text-success">
                  <ArrowUpIcon className="w-3 h-3 mr-1" />
                  +12.5%
                </span>
                {getText("vsYesterday")}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{getText("inboundScheduled")}</CardTitle>
              <ArrowUpIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156,890</div>
              <p className="text-xs text-muted-foreground">
                {getText("next7Days")}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard */}
        <Tabs defaultValue="inventory" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              {getText("inventoryStatus")}
            </TabsTrigger>
            <TabsTrigger value="outbound" className="flex items-center gap-2">
              <TruckIcon className="w-4 h-4" />
              {getText("outboundStatus")}
            </TabsTrigger>
            <TabsTrigger value="inbound" className="flex items-center gap-2">
              <ArrowUpIcon className="w-4 h-4" />
              {getText("inboundSchedule")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="mt-6">
            <InventoryOverview />
          </TabsContent>

          <TabsContent value="outbound" className="mt-6">
            <OutboundDashboard />
          </TabsContent>

          <TabsContent value="inbound" className="mt-6">
            <InboundDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
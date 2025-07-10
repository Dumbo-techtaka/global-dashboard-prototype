import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon, Clock, AlertTriangle, CheckCircle, MapPin } from "lucide-react";
import { useApp } from "@/context/AppContext";

export const InboundDashboard = () => {
  const { getText, formatDate } = useApp();
  
  const inboundData = [
    {
      id: "IB-001",
      from: `${getText("koreaSupplier")} A`,
      to: `SG-01 ${getText("center")}`,
      expectedDate: "2024-01-15",
      sku: "ABC-001",
      quantity: 10000,
      status: getText("processing"),
      delay: false,
    },
    {
      id: "IB-002", 
      from: `${getText("chinaSupplier")} B`,
      to: `US-01 ${getText("center")}`,
      expectedDate: "2024-01-17",
      sku: "DEF-002",
      quantity: 15000,
      status: getText("urgent"),
      delay: true,
    },
    {
      id: "IB-003",
      from: `SG-01 ${getText("center")}`,
      to: `US-02 ${getText("center")}`,
      expectedDate: "2024-01-20",
      sku: "GHI-003",
      quantity: 5000,
      status: getText("pending"),
      delay: false,
    },
    {
      id: "IB-004",
      from: `${getText("koreaSupplier")} C`,
      to: `SG-01 ${getText("center")}`,
      expectedDate: "2024-01-12",
      sku: "JKL-004",
      quantity: 8000,
      status: getText("completed"),
      delay: false,
    },
  ];

  const getStatusBadge = (status: string, delay: boolean) => {
    if (delay) return <Badge variant="destructive">{getText("urgent")}</Badge>;
    
    if (status === getText("completed")) {
      return <Badge className="bg-success text-success-foreground">{getText("completed")}</Badge>;
    } else if (status === getText("processing")) {
      return <Badge className="bg-info text-info-foreground">{getText("processing")}</Badge>;
    } else if (status === getText("pending")) {
      return <Badge variant="secondary">{getText("pending")}</Badge>;
    } else {
      return <Badge variant="outline">{status}</Badge>;
    }
  };

  const upcomingInbound = inboundData.filter(item => 
    item.status !== getText("completed") && new Date(item.expectedDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  );

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{getText("thisWeekInbound")}</CardTitle>
            <ArrowUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38,000</div>
            <p className="text-xs text-muted-foreground">
              3{getText("cases")} {getText("inboundScheduled")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{getText("processing")}</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              10,000{getText("items")} (ABC-001)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{getText("delayedCount")}</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">1</div>
            <p className="text-xs text-muted-foreground">
              15,000{getText("items")} (DEF-002)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{getText("completionRate")}</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">92%</div>
            <p className="text-xs text-muted-foreground">
              {getText("last30DaysBasis")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Inbound Flow Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            {getText("inboundFlowStatus")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* From Locations */}
            <div className="space-y-3">
              <h4 className="font-medium text-center">{getText("supplier")}</h4>
              <div className="space-y-2">
                <div className="bg-muted/30 p-3 rounded-lg text-center">
                  <div className="font-medium">{getText("koreaSupplier")}</div>
                  <div className="text-sm text-muted-foreground">18,000{getText("items")}</div>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg text-center">
                  <div className="font-medium">{getText("chinaSupplier")}</div>
                  <div className="text-sm text-muted-foreground">15,000{getText("items")}</div>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg text-center">
                  <div className="font-medium">{getText("centerTransfer")}</div>
                  <div className="text-sm text-muted-foreground">5,000{getText("items")}</div>
                </div>
              </div>
            </div>

            {/* Flow Arrows */}
            <div className="flex items-center justify-center">
              <div className="text-center">
                <ArrowUpIcon className="w-8 h-8 mx-auto text-primary" />
                <div className="text-sm text-muted-foreground mt-2">{getText("inboundScheduled")}</div>
                <div className="font-semibold">38,000{getText("items")}</div>
              </div>
            </div>

            {/* To Locations */}
            <div className="space-y-3">
              <h4 className="font-medium text-center">{getText("destinationCenter")}</h4>
              <div className="space-y-2">
                <div className="bg-primary/10 p-3 rounded-lg text-center">
                  <div className="font-medium">SG-01 {getText("center")}</div>
                  <div className="text-sm text-muted-foreground">18,000{getText("items")}</div>
                </div>
                <div className="bg-info/10 p-3 rounded-lg text-center">
                  <div className="font-medium">US-01 {getText("center")}</div>
                  <div className="text-sm text-muted-foreground">15,000{getText("items")}</div>
                </div>
                <div className="bg-success/10 p-3 rounded-lg text-center">
                  <div className="font-medium">US-02 {getText("center")}</div>
                  <div className="text-sm text-muted-foreground">5,000{getText("items")}</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Inbound Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            {getText("inboundScheduledList")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{getText("inboundId")}</TableHead>
                <TableHead>{getText("supplier")}</TableHead>
                <TableHead>{getText("center")}</TableHead>
                <TableHead>{getText("expectedDate")}</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead className="text-right">{getText("totalQuantity")}</TableHead>
                <TableHead>{getText("status")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inboundData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono">{item.id}</TableCell>
                  <TableCell>{item.from}</TableCell>
                  <TableCell>{item.to}</TableCell>
                  <TableCell>{formatDate(item.expectedDate)}</TableCell>
                  <TableCell className="font-mono">{item.sku}</TableCell>
                  <TableCell className="text-right font-semibold">
                    {item.quantity.toLocaleString()}
                  </TableCell>
                  <TableCell>{getStatusBadge(item.status, item.delay)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Alerts and Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            {getText("inboundAlerts")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-destructive/10 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              <div className="flex-1">
                <p className="text-sm font-medium">IB-002 {getText("inboundDelayed")}</p>
                <p className="text-xs text-muted-foreground">DEF-002, {getText("scheduledDate")}: 1/17, {getText("currentDelay")} 2{getText("oneDay")}</p>
              </div>
              <Button variant="outline" size="sm">{getText("viewDetails")}</Button>
            </div>

            <div className="flex items-center gap-3 p-3 bg-warning/10 rounded-lg">
              <Clock className="w-4 h-4 text-warning" />
              <div className="flex-1">
                <p className="text-sm font-medium">IB-001 {getText("arrivingTomorrow")}</p>
                <p className="text-xs text-muted-foreground">ABC-001, 10,000{getText("items")}, SG-01 {getText("center")}</p>
              </div>
              <Button variant="outline" size="sm">{getText("prepare")}</Button>
            </div>

            <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
              <CheckCircle className="w-4 h-4 text-success" />
              <div className="flex-1">
                <p className="text-sm font-medium">IB-004 {getText("inboundCompleted")}</p>
                <p className="text-xs text-muted-foreground">JKL-004, 8,000{getText("items")}, SG-01 {getText("center")}</p>
              </div>
              <Button variant="outline" size="sm">{getText("confirm")}</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
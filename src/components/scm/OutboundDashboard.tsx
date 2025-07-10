import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TruckIcon, Package, BarChart3, ChevronDown, ChevronRight, Clock, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/context/AppContext";

export const OutboundDashboard = () => {
  const { getText } = useApp();
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const toggleRow = (id: string) => {
    setExpandedRows(prev => 
      prev.includes(id) ? prev.filter(row => row !== id) : [...prev, id]
    );
  };

  const outboundData = [
    {
      id: "SG-01",
      country: getText("singapore"),
      center: "SG-01",
      totalOrders: 15678,
      totalQuantity: 45890,
      channels: [
        { name: "Amazon SG", orders: 8900, quantity: 23456 },
        { name: "Qoo10 SG", orders: 4500, quantity: 15670 },
        { name: "Shopee SG", orders: 2278, quantity: 6764 },
      ],
      skuDetails: [
        { sku: "ABC-001", channel: "Amazon SG", quantity: 1200 },
        { sku: "DEF-002", channel: "Amazon SG", quantity: 890 },
        { sku: "ABC-001", channel: "Qoo10 SG", quantity: 567 },
      ]
    },
    {
      id: "US-01",
      country: getText("usa"),
      center: "US-01",
      totalOrders: 23456,
      totalQuantity: 67890,
      channels: [
        { name: "Amazon US", orders: 18900, quantity: 56780 },
        { name: "eBay US", orders: 3200, quantity: 8900 },
        { name: getText("ownMall"), orders: 1356, quantity: 2210 },
      ],
      skuDetails: [
        { sku: "ABC-001", channel: "Amazon US", quantity: 2100 },
        { sku: "GHI-003", channel: "Amazon US", quantity: 1890 },
        { sku: "DEF-002", channel: "eBay US", quantity: 1200 },
      ]
    },
  ];

  return (
    <div className="space-y-6">
      {/* Delay Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{getText("outboundDelay")}</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">3.2%</div>
            <p className="text-xs text-muted-foreground">
              {getText("delayedOutbound")}: 124{getText("cases")} / {getText("total")} 3,890{getText("cases")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{getText("deliveryDelay")}</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">1.8%</div>
            <p className="text-xs text-muted-foreground">
              {getText("delayedDelivery")}: 67{getText("cases")} / {getText("total")} 3,766{getText("cases")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{getText("avgOutboundTime")}</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2{getText("oneDay")}</div>
            <p className="text-xs text-muted-foreground">
              {getText("outboundAccept")} → {getText("outboundComplete")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{getText("avgDeliveryTime")}</CardTitle>
            <TruckIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.4{getText("oneDay")}</div>
            <p className="text-xs text-muted-foreground">
              {getText("outboundComplete")} → {getText("deliveryComplete")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Channel Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Amazon {getText("channels")}</CardTitle>
            <TruckIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">27,800</div>
            <p className="text-xs text-muted-foreground">
              {getText("totalOutbound")} ({getText("totalOf")} 68%)
            </p>
            <div className="mt-2">
              <Badge className="mr-2">SG: 8,900</Badge>
              <Badge variant="secondary">US: 18,900</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{getText("otherMarketplaces")}</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">11,334</div>
            <p className="text-xs text-muted-foreground">
              {getText("totalOutbound")} ({getText("totalOf")} 29%)
            </p>
            <div className="mt-2">
              <Badge className="mr-2">Qoo10: 4,500</Badge>
              <Badge variant="secondary">{getText("others")}: 6,834</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{getText("avgProcessingTime")}</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2{getText("oneDay")}</div>
            <p className="text-xs text-muted-foreground">
              {getText("outboundAccept")} → {getText("outboundComplete")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Outbound Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TruckIcon className="w-5 h-5" />
            {getText("centerOutboundStatus")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {outboundData.map((data) => (
              <div key={data.id} className="border rounded-lg">
                <div 
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50"
                  onClick={() => toggleRow(data.id)}
                >
                  <div className="flex items-center gap-3">
                    {expandedRows.includes(data.id) ? 
                      <ChevronDown className="w-4 h-4" /> : 
                      <ChevronRight className="w-4 h-4" />
                    }
                    <div>
                      <h4 className="font-semibold">{data.country} - {data.center}</h4>
                      <p className="text-sm text-muted-foreground">
                        {getText("totalOutbound")}: {data.totalOrders.toLocaleString()}{getText("cases")} | 
                        {getText("totalQuantity")}: {data.totalQuantity.toLocaleString()}{getText("items")}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">
                    {data.channels.length}{getText("items")} {getText("channels")}
                  </Badge>
                </div>

                {expandedRows.includes(data.id) && (
                  <div className="border-t p-4 space-y-4">
                    {/* Channel Breakdown */}
                    <div>
                      <h5 className="font-medium mb-3">{getText("channelSalesStatus")}</h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {data.channels.map((channel, idx) => (
                          <div key={idx} className="bg-muted/30 p-3 rounded-lg">
                            <h6 className="font-medium text-sm">{channel.name}</h6>
                            <div className="text-lg font-semibold">{channel.orders.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">{getText("outbound")} {channel.quantity.toLocaleString()}{getText("items")}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* SKU Details */}
                    <div>
                      <h5 className="font-medium mb-3">{getText("skuOutboundDetails")}</h5>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>{getText("sku")}</TableHead>
                            <TableHead>{getText("salesChannel")}</TableHead>
                            <TableHead className="text-right">{getText("outboundQuantity")}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {data.skuDetails.map((item, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-mono">{item.sku}</TableCell>
                              <TableCell>{item.channel}</TableCell>
                              <TableCell className="text-right">{item.quantity.toLocaleString()}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{getText("hourlyOutboundVolume")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-end justify-between gap-2">
              {[12, 8, 15, 22, 18, 25, 30, 28, 20, 16, 14, 10].map((value, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div 
                    className="bg-primary w-6 rounded-t"
                    style={{ height: `${(value / 30) * 160}px` }}
                  />
                  <span className="text-xs text-muted-foreground mt-1">
                    {String(idx).padStart(2, '0')}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{getText("channelOccupancyRate")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">{getText("amazon")}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full">
                    <div className="w-16 h-2 bg-primary rounded-full" />
                  </div>
                  <span className="text-sm font-medium">68%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">{getText("qoo10")}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full">
                    <div className="w-7 h-2 bg-info rounded-full" />
                  </div>
                  <span className="text-sm font-medium">12%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">{getText("others")}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full">
                    <div className="w-5 h-2 bg-success rounded-full" />
                  </div>
                  <span className="text-sm font-medium">20%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
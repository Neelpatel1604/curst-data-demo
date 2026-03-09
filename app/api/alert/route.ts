import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const alertText = (body.alert as string)?.trim() || "General alert";
    const label = (body.label as string)?.trim() || "Watcher";

    // Simulate setting an alert (in production: call Crustdata Watcher API)
    console.log(`[Watcher Simulation] Alert set: ${label} - ${alertText}`);

    return NextResponse.json({
      success: true,
      message: "Alert set successfully (simulated)",
      alert: alertText,
      label,
    });
  } catch (error) {
    console.error("Alert API error:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to set alert" },
      { status: 500 }
    );
  }
}

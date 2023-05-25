<?php

namespace App\Jobs;

use App\Facades\ConversationFacade;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class FetchMessageJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

  var $message = 'NA';
  var $conversationID = 'NA';

    /**
     * Create a new job instance.
     */
    public function __construct($message, $conversationID)
    {
      // Log::channel("appdebug")->info($message." quing");
      $this->message = $message["message"];
      $this->conversationID = $conversationID;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
      // Log::channel("appdebug")->info($this->conversationID);
      ConversationFacade::receive("[" . uniqid() . "] response for " . $this->message, $this->conversationID);
    }
}

/*********************************************************************************
Copyright © 2016, Alliance for Sustainable Energy, LLC
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, 
are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list 
of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list 
of conditions and the following disclaimer in the documentation and/or other materials 
provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be 
used to endorse or promote products derived from this software without specific prior 
written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES 
OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT 
SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, 
INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED 
TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR 
BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN 
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN 
ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF 
SUCH DAMAGE.
*******************************************************************************/

var exp = 
[   //Choice sets for shirts 
    [
    {
        "Choice.situation": 1,
        "alt1.price": 1,
        "alt1.slab": 1,
        "alt1.plab": 0,
        "alt1.org": 2,
        "alt1.cf": 1,
        "alt2.price": 0,
        "alt2.slab": 0,
        "alt2.plab": 1,
        "alt2.org": 0,
        "alt2.cf": 1
    },
    {
        "Choice.situation": 2,
        "alt1.price": 1,
        "alt1.slab": 0,
        "alt1.plab": 0,
        "alt1.org": 0,
        "alt1.cf": 0,
        "alt2.price": 1,
        "alt2.slab": 1,
        "alt2.plab": 1,
        "alt2.org": 0,
        "alt2.cf": 2
    },
    {
        "Choice.situation": 3,
        "alt1.price": 0,
        "alt1.slab": 1,
        "alt1.plab": 1,
        "alt1.org": 1,
        "alt1.cf": 2,
        "alt2.price": 1,
        "alt2.slab": 0,
        "alt2.plab": 0,
        "alt2.org": 0,
        "alt2.cf": 0
    },
    {
        "Choice.situation": 4,
        "alt1.price": 1,
        "alt1.slab": 0,
        "alt1.plab": 0,
        "alt1.org": 1,
        "alt1.cf": 2,
        "alt2.price": 1,
        "alt2.slab": 1,
        "alt2.plab": 1,
        "alt2.org": 1,
        "alt2.cf": 0
    },
    {
        "Choice.situation": 5,
        "alt1.price": 0,
        "alt1.slab": 1,
        "alt1.plab": 0,
        "alt1.org": 2,
        "alt1.cf": 0,
        "alt2.price": 1,
        "alt2.slab": 0,
        "alt2.plab": 1,
        "alt2.org": 2,
        "alt2.cf": 1
    },
    {
        "Choice.situation": 6,
        "alt1.price": 1,
        "alt1.slab": 1,
        "alt1.plab": 1,
        "alt1.org": 0,
        "alt1.cf": 1,
        "alt2.price": 0,
        "alt2.slab": 0,
        "alt2.plab": 0,
        "alt2.org": 1,
        "alt2.cf": 1
    },
    {
        "Choice.situation": 7,
        "alt1.price": 0,
        "alt1.slab": 0,
        "alt1.plab": 1,
        "alt1.org": 0,
        "alt1.cf": 1,
        "alt2.price": 1,
        "alt2.slab": 1,
        "alt2.plab": 0,
        "alt2.org": 2,
        "alt2.cf": 2
    },
    {
        "Choice.situation": 8,
        "alt1.price": 0,
        "alt1.slab": 0,
        "alt1.plab": 0,
        "alt1.org": 2,
        "alt1.cf": 0,
        "alt2.price": 0,
        "alt2.slab": 1,
        "alt2.plab": 1,
        "alt2.org": 2,
        "alt2.cf": 2
    },
    {
        "Choice.situation": 9,
        "alt1.price": 0,
        "alt1.slab": 1,
        "alt1.plab": 1,
        "alt1.org": 2,
        "alt1.cf": 0,
        "alt2.price": 0,
        "alt2.slab": 0,
        "alt2.plab": 0,
        "alt2.org": 2,
        "alt2.cf": 2
    },
    {
        "Choice.situation": 10,
        "alt1.price": 0,
        "alt1.slab": 0,
        "alt1.plab": 1,
        "alt1.org": 1,
        "alt1.cf": 2,
        "alt2.price": 1,
        "alt2.slab": 1,
        "alt2.plab": 0,
        "alt2.org": 0,
        "alt2.cf": 0
    },
    {
        "Choice.situation": 11,
        "alt1.price": 1,
        "alt1.slab": 0,
        "alt1.plab": 1,
        "alt1.org": 1,
        "alt1.cf": 1,
        "alt2.price": 0,
        "alt2.slab": 1,
        "alt2.plab": 0,
        "alt2.org": 1,
        "alt2.cf": 1
    },
    {
        "Choice.situation": 12,
        "alt1.price": 1,
        "alt1.slab": 1,
        "alt1.plab": 0,
        "alt1.org": 0,
        "alt1.cf": 2,
        "alt2.price": 0,
        "alt2.slab": 0,
        "alt2.plab": 1,
        "alt2.org": 1,
        "alt2.cf": 0
    }
    ],//Choice sets for refrigerators 
    [
    {
        "Choice.situation": 1,
        "alt1.price": 1029,
        "alt1.cap": 25.3,
        "alt1.brand": 3,
        "alt1.con": 0,
        "alt1.ice": 0,
        "alt1.cf": 1,
        "alt2.price": 879,
        "alt2.cap": 24.5,
        "alt2.brand": 0,
        "alt2.con": 1,
        "alt2.ice": 1,
        "alt2.cf": 1
    },
    {
        "Choice.situation": 2,
        "alt1.price": 1029,
        "alt1.cap": 25.8,
        "alt1.brand": 2,
        "alt1.con": 1,
        "alt1.ice": 2,
        "alt1.cf": 0,
        "alt2.price": 879,
        "alt2.cap": 23.7,
        "alt2.brand": 1,
        "alt2.con": 0,
        "alt2.ice": 0,
        "alt2.cf": 2
    },
    {
        "Choice.situation": 3,
        "alt1.price": 1029,
        "alt1.cap": 24.5,
        "alt1.brand": 1,
        "alt1.con": 0,
        "alt1.ice": 2,
        "alt1.cf": 1,
        "alt2.price": 879,
        "alt2.cap": 25.3,
        "alt2.brand": 3,
        "alt2.con": 1,
        "alt2.ice": 3,
        "alt2.cf": 1
    },
    {
        "Choice.situation": 4,
        "alt1.price": 879,
        "alt1.cap": 24.5,
        "alt1.brand": 2,
        "alt1.con": 1,
        "alt1.ice": 0,
        "alt1.cf": 0,
        "alt2.price": 1029,
        "alt2.cap": 25.3,
        "alt2.brand": 0,
        "alt2.con": 0,
        "alt2.ice": 2,
        "alt2.cf": 2
    },
    {
        "Choice.situation": 5,
        "alt1.price": 979,
        "alt1.cap": 23.7,
        "alt1.brand": 3,
        "alt1.con": 0,
        "alt1.ice": 3,
        "alt1.cf": 1,
        "alt2.price": 929,
        "alt2.cap": 25.8,
        "alt2.brand": 1,
        "alt2.con": 1,
        "alt2.ice": 0,
        "alt2.cf": 1
    },
    {
        "Choice.situation": 6,
        "alt1.price": 979,
        "alt1.cap": 25.3,
        "alt1.brand": 1,
        "alt1.con": 1,
        "alt1.ice": 1,
        "alt1.cf": 0,
        "alt2.price": 929,
        "alt2.cap": 24.5,
        "alt2.brand": 2,
        "alt2.con": 0,
        "alt2.ice": 2,
        "alt2.cf": 2
    },
    {
        "Choice.situation": 7,
        "alt1.price": 929,
        "alt1.cap": 25.8,
        "alt1.brand": 2,
        "alt1.con": 0,
        "alt1.ice": 1,
        "alt1.cf": 2,
        "alt2.price": 979,
        "alt2.cap": 23.7,
        "alt2.brand": 3,
        "alt2.con": 1,
        "alt2.ice": 2,
        "alt2.cf": 0
    },
    {
        "Choice.situation": 8,
        "alt1.price": 879,
        "alt1.cap": 25.3,
        "alt1.brand": 3,
        "alt1.con": 0,
        "alt1.ice": 1,
        "alt1.cf": 1,
        "alt2.price": 1029,
        "alt2.cap": 24.5,
        "alt2.brand": 2,
        "alt2.con": 1,
        "alt2.ice": 3,
        "alt2.cf": 1
    },
    {
        "Choice.situation": 9,
        "alt1.price": 929,
        "alt1.cap": 23.7,
        "alt1.brand": 1,
        "alt1.con": 1,
        "alt1.ice": 2,
        "alt1.cf": 2,
        "alt2.price": 979,
        "alt2.cap": 25.8,
        "alt2.brand": 0,
        "alt2.con": 0,
        "alt2.ice": 0,
        "alt2.cf": 0
    },
    {
        "Choice.situation": 10,
        "alt1.price": 879,
        "alt1.cap": 24.5,
        "alt1.brand": 0,
        "alt1.con": 0,
        "alt1.ice": 3,
        "alt1.cf": 0,
        "alt2.price": 1029,
        "alt2.cap": 25.3,
        "alt2.brand": 3,
        "alt2.con": 1,
        "alt2.ice": 1,
        "alt2.cf": 2
    },
    {
        "Choice.situation": 11,
        "alt1.price": 929,
        "alt1.cap": 25.8,
        "alt1.brand": 0,
        "alt1.con": 1,
        "alt1.ice": 3,
        "alt1.cf": 2,
        "alt2.price": 979,
        "alt2.cap": 23.7,
        "alt2.brand": 2,
        "alt2.con": 0,
        "alt2.ice": 1,
        "alt2.cf": 0
    },
    {
        "Choice.situation": 12,
        "alt1.price": 979,
        "alt1.cap": 23.7,
        "alt1.brand": 0,
        "alt1.con": 1,
        "alt1.ice": 0,
        "alt1.cf": 2,
        "alt2.price": 929,
        "alt2.cap": 25.8,
        "alt2.brand": 1,
        "alt2.con": 0,
        "alt2.ice": 3,
        "alt2.cf": 0
    }
    ],//Choice sets for meat
    [
    {
        "Choice.situation": 1,
        "alt1.price": 11.99,
        "alt1.label": 1,
        "alt1.cert": 0,
        "alt1.cf": 1,
        "alt2.price": 5.99,
        "alt2.label": 3,
        "alt2.cert": 2,
        "alt2.cf": 1
    },
    {
        "Choice.situation": 2,
        "alt1.price": 5.99,
        "alt1.label": 3,
        "alt1.cert": 1,
        "alt1.cf": 2,
        "alt2.price": 8.99,
        "alt2.label": 1,
        "alt2.cert": 0,
        "alt2.cf": 0
    },
    {
        "Choice.situation": 3,
        "alt1.price": 5.99,
        "alt1.label": 0,
        "alt1.cert": 1,
        "alt1.cf": 0,
        "alt2.price": 5.99,
        "alt2.label": 3,
        "alt2.cert": 2,
        "alt2.cf": 2
    },
    {
        "Choice.situation": 4,
        "alt1.price": 11.99,
        "alt1.label": 2,
        "alt1.cert": 1,
        "alt1.cf": 1,
        "alt2.price": 8.99,
        "alt2.label": 1,
        "alt2.cert": 0,
        "alt2.cf": 1
    },
    {
        "Choice.situation": 5,
        "alt1.price": 8.99,
        "alt1.label": 0,
        "alt1.cert": 0,
        "alt1.cf": 2,
        "alt2.price": 11.99,
        "alt2.label": 1,
        "alt2.cert": 1,
        "alt2.cf": 0
    },
    {
        "Choice.situation": 6,
        "alt1.price": 8.99,
        "alt1.label": 3,
        "alt1.cert": 0,
        "alt1.cf": 0,
        "alt2.price": 11.99,
        "alt2.label": 2,
        "alt2.cert": 2,
        "alt2.cf": 2
    },
    {
        "Choice.situation": 7,
        "alt1.price": 11.99,
        "alt1.label": 0,
        "alt1.cert": 2,
        "alt1.cf": 1,
        "alt2.price": 8.99,
        "alt2.label": 2,
        "alt2.cert": 1,
        "alt2.cf": 1
    },
    {
        "Choice.situation": 8,
        "alt1.price": 5.99,
        "alt1.label": 1,
        "alt1.cert": 1,
        "alt1.cf": 1,
        "alt2.price": 8.99,
        "alt2.label": 0,
        "alt2.cert": 2,
        "alt2.cf": 1
    },
    {
        "Choice.situation": 9,
        "alt1.price": 8.99,
        "alt1.label": 3,
        "alt1.cert": 2,
        "alt1.cf": 0,
        "alt2.price": 11.99,
        "alt2.label": 0,
        "alt2.cert": 1,
        "alt2.cf": 2
    },
    {
        "Choice.situation": 10,
        "alt1.price": 5.99,
        "alt1.label": 2,
        "alt1.cert": 0,
        "alt1.cf": 2,
        "alt2.price": 5.99,
        "alt2.label": 0,
        "alt2.cert": 1,
        "alt2.cf": 0
    },
    {
        "Choice.situation": 11,
        "alt1.price": 8.99,
        "alt1.label": 2,
        "alt1.cert": 2,
        "alt1.cf": 0,
        "alt2.price": 5.99,
        "alt2.label": 3,
        "alt2.cert": 0,
        "alt2.cf": 2
    },
    {
        "Choice.situation": 12,
        "alt1.price": 11.99,
        "alt1.label": 1,
        "alt1.cert": 2,
        "alt1.cf": 2,
        "alt2.price": 11.99,
        "alt2.label": 2,
        "alt2.cert": 0,
        "alt2.cf": 0
    }
    ],//Choice sets for travel
    [
    {
        "Choice.situation": 1,
        "alt1.toll": 4,
        "alt1.time": 1.33,
        "alt1.variation": 12,
        "alt1.safe": 2,
        "alt1.cf": 2,
        "alt2.toll": 0,
        "alt2.time": 1.67,
        "alt2.variation": 12,
        "alt2.safe": 2,
        "alt2.cf": 0
    },
    {
        "Choice.situation": 2,
        "alt1.toll": 2,
        "alt1.time": 1.67,
        "alt1.variation": 18,
        "alt1.safe": 3,
        "alt1.cf": 0,
        "alt2.toll": 2,
        "alt2.time": 1.33,
        "alt2.variation": 5,
        "alt2.safe": 1,
        "alt2.cf": 2
    },
    {
        "Choice.situation": 3,
        "alt1.toll": 2,
        "alt1.time": 1.67,
        "alt1.variation": 5,
        "alt1.safe": 3,
        "alt1.cf": 2,
        "alt2.toll": 0,
        "alt2.time": 1.33,
        "alt2.variation": 18,
        "alt2.safe": 1,
        "alt2.cf": 0
    },
    {
        "Choice.situation": 4,
        "alt1.toll": 0,
        "alt1.time": 1.67,
        "alt1.variation": 12,
        "alt1.safe": 2,
        "alt1.cf": 1,
        "alt2.toll": 4,
        "alt2.time": 1.5,
        "alt2.variation": 12,
        "alt2.safe": 2,
        "alt2.cf": 1
    },
    {
        "Choice.situation": 5,
        "alt1.toll": 0,
        "alt1.time": 1.5,
        "alt1.variation": 18,
        "alt1.safe": 2,
        "alt1.cf": 1,
        "alt2.toll": 4,
        "alt2.time": 1.5,
        "alt2.variation": 5,
        "alt2.safe": 2,
        "alt2.cf": 1
    },
    {
        "Choice.situation": 6,
        "alt1.toll": 0,
        "alt1.time": 1.67,
        "alt1.variation": 18,
        "alt1.safe": 1,
        "alt1.cf": 1,
        "alt2.toll": 4,
        "alt2.time": 1.33,
        "alt2.variation": 5,
        "alt2.safe": 3,
        "alt2.cf": 1
    },
    {
        "Choice.situation": 7,
        "alt1.toll": 4,
        "alt1.time": 1.5,
        "alt1.variation": 5,
        "alt1.safe": 3,
        "alt1.cf": 0,
        "alt2.toll": 0,
        "alt2.time": 1.5,
        "alt2.variation": 18,
        "alt2.safe": 1,
        "alt2.cf": 2
    },
    {
        "Choice.situation": 8,
        "alt1.toll": 4,
        "alt1.time": 1.33,
        "alt1.variation": 12,
        "alt1.safe": 3,
        "alt1.cf": 1,
        "alt2.toll": 2,
        "alt2.time": 1.67,
        "alt2.variation": 12,
        "alt2.safe": 1,
        "alt2.cf": 1
    },
    {
        "Choice.situation": 9,
        "alt1.toll": 0,
        "alt1.time": 1.5,
        "alt1.variation": 5,
        "alt1.safe": 1,
        "alt1.cf": 2,
        "alt2.toll": 4,
        "alt2.time": 1.33,
        "alt2.variation": 18,
        "alt2.safe": 3,
        "alt2.cf": 0
    },
    {
        "Choice.situation": 10,
        "alt1.toll": 2,
        "alt1.time": 1.33,
        "alt1.variation": 12,
        "alt1.safe": 1,
        "alt1.cf": 0,
        "alt2.toll": 2,
        "alt2.time": 1.67,
        "alt2.variation": 12,
        "alt2.safe": 3,
        "alt2.cf": 2
    },
    {
        "Choice.situation": 11,
        "alt1.toll": 2,
        "alt1.time": 1.5,
        "alt1.variation": 5,
        "alt1.safe": 1,
        "alt1.cf": 0,
        "alt2.toll": 2,
        "alt2.time": 1.5,
        "alt2.variation": 18,
        "alt2.safe": 3,
        "alt2.cf": 2
    },
    {
        "Choice.situation": 12,
        "alt1.toll": 4,
        "alt1.time": 1.33,
        "alt1.variation": 18,
        "alt1.safe": 2,
        "alt1.cf": 2,
        "alt2.toll": 0,
        "alt2.time": 1.67,
        "alt2.variation": 5,
        "alt2.safe": 2,
        "alt2.cf": 0
    }
    ]
]
 ;
